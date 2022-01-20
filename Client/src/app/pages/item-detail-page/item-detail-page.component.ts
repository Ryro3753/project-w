import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from 'src/app/events/features.popup.event';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { ShareRequest } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { ItemTypeDetail, ItemTypeUpdateRequest } from 'src/app/models/item.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { UploadService } from 'src/app/services/common/upload.service';
import { ItemService } from 'src/app/services/item.service';
import { State } from 'src/app/store/reducer/reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-detail-page',
  templateUrl: './item-detail-page.component.html',
  styleUrls: ['./item-detail-page.component.css']
})
export class ItemDetailPageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly itemService: ItemService,
    readonly activatedRoute: ActivatedRoute,
    readonly alertService: AlertService,
    readonly router: Router,
    readonly uploadService: UploadService,
    readonly bus: MessageBusService,
    readonly confirmationService: ConfirmationService) {
    this.subscribes.push(this.bus.of(FeaturesClosePopupEvent).subscribe(this.featuresPopupSaved.bind(this)));
    this.subscribes.push(this.bus.of(SharePopupUsernameEvent).subscribe(this.sharePopupResponse.bind(this)));
  }

  currentUser: User | undefined;
  itemTypeId!: number;
  itemTypeDetail!: ItemTypeDetail;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  itemImageBasePath = this.apiURL + '/images/ItemImages/';

  edit: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(i => this.itemTypeId = i['itemId']);
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        const result = await this.itemService.getItemType(this.itemTypeId, i.user.Id);
        if ((result as any).error == "No item found") {
          this.alertService.alert({ alertInfo: { message: 'No item found', type: 'danger', timeout: 7000 } });
          this.router.navigateByUrl('/Items');
        }
        else
          this.itemTypeDetail = result;
      }
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async addImage(e: any) {
    if (this.itemTypeDetail) {
      this.uploadService.uploadItemTypeImage(e.target.files[0], this.itemTypeDetail.Id).toPromise().then(i => {
        this.itemTypeDetail.HasImage = true;
      });
    }
  }

  featuresClick() {
    if (this.itemTypeDetail)
      this.bus.publish(new FeaturesPopupEvent('itemTypeId:' + this.itemTypeDetail.Id.toString(), this.itemTypeDetail.Features));
  }

  addAttribute() {
    if (this.itemTypeDetail.Attributes == undefined)
      this.itemTypeDetail.Attributes = [];
    this.itemTypeDetail.Attributes.push({ Attribute: '', Value: '' });
  }

  featuresPopupSaved(event: FeaturesClosePopupEvent) {
    if (this.itemTypeDetail && event.to == 'itemTypeId:' + this.itemTypeDetail.Id.toString()) {
      this.itemTypeDetail.Features = JSON.parse(JSON.stringify(event.features));
    }
  }

  async save() {
    if (!this.itemTypeDetail)
      return;
    const request = {
      ItemTypeId: this.itemTypeDetail.Id,
      Category: this.itemTypeDetail.Category,
      Type: this.itemTypeDetail.Type,
      Description: this.itemTypeDetail.Description,
      Name: this.itemTypeDetail.Name,
      Tags: this.itemTypeDetail.Tags,
      Equippable: this.itemTypeDetail.Equippable,
      Attributes: this.itemTypeDetail.Attributes,
      Features: this.itemTypeDetail.Features
    } as ItemTypeUpdateRequest;

    const result = await this.itemService.updateItemType(request);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })
  }

  share() {
    if (this.itemTypeDetail)
      this.bus.publish(new SharePopupEvent('itemId:' + this.itemTypeDetail.Id.toString()));
  }

  async sharePopupResponse(event: SharePopupUsernameEvent) {
    if (!this.itemTypeDetail || event.to !== 'itemId:' + this.itemTypeDetail.Id.toString())
      return;
    const request = {
      ObjectId: this.itemTypeDetail.Id,
      Username: event.username
    } as ShareRequest;
    const result = await this.itemService.shareItemType(request);
    if (result == true) {
      this.bus.publish(new SharePopupCloseEvent());
      this.alertService.alert({ alertInfo: { message: 'This item successfully shared with ' + event.username, type: 'success', timeout: 5000 } });
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }
  }

  async deleteItem() {
    if (!this.itemTypeDetail)
      return;
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Item').toPromise().then(async res => {
      if (res && this.itemTypeDetail && this.currentUser) {
        const result = await this.itemService.deleteItemType(this.itemTypeDetail.Id, this.currentUser.Id)
        if (result) {
          this.alertService.alert({ alertInfo: { message: 'Item successfully deleted', type: 'success', timeout: 3000 } });
          this.router.navigateByUrl('/Items');
        }
      }
    })
  }

}
