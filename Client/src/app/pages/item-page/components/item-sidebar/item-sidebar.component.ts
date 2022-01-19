import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { ShareRequest } from 'src/app/models/common/common.model';
import { ItemType } from 'src/app/models/item.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-sidebar',
  templateUrl: './item-sidebar.component.html',
  styleUrls: ['./item-sidebar.component.css']
})
export class ItemSidebarComponent implements OnInit {
  
  subscribes: SubscriptionLike[] = [];

  constructor(readonly itemService: ItemService,
              readonly bus: MessageBusService,
              readonly alertService: AlertService,
              readonly router: Router) {
    this.subscribes.push(this.bus.of(SharePopupUsernameEvent).subscribe(this.sharePopupResponse.bind(this)));
   }

  @Input() item!: ItemType;
  @Output() closeClicked: EventEmitter<any> = new EventEmitter<any>();

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  itemImageBasePath = this.apiURL + '/images/ItemImages/';

  ngOnInit(): void {
  }

  close(){
    this.closeClicked.emit();
  }

  details(event: any){
    if(event.which == 2){
    window.open('/Items/' + this.item.Id, '_blank');
    }
    else if(event.which == 1) {
      this.router.navigateByUrl('Items/' + this.item.Id);
    }
  }


  share() {
    if (this.item)
      this.bus.publish(new SharePopupEvent('itemId:' + this.item.Id.toString()));
  }

  async sharePopupResponse(event: SharePopupUsernameEvent) {
    if (!this.item || event.to !== 'itemId:' + this.item.Id.toString())
      return;
    const request = {
      ObjectId: this.item.Id,
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

}
