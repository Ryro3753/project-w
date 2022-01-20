import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { FeaturesPopupEvent } from 'src/app/events/features.popup.event';
import { User } from 'src/app/models/common/user.model';
import { ItemTypeDetail } from 'src/app/models/item.model';
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
    readonly bus: MessageBusService) { }

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
        if((result as any).error == "No item found"){
          this.alertService.alert({alertInfo:{message:'No item found', type:'danger',timeout:7000}});
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

  addAttribute(){
    if(this.itemTypeDetail.Attributes == undefined)
      this.itemTypeDetail.Attributes = [];
    this.itemTypeDetail.Attributes.push({Attribute: '', Value: ''});
  }

}
