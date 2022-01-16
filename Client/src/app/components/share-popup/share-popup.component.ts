import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SubscriptionLike } from 'rxjs';
import { SharePopupCloseEvent, SharePopupEvent } from 'src/app/events/share.popup.event';
import { MessageBusService } from 'src/app/services/common/messagebus.service';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.css']
})
export class SharePopupComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly bus: MessageBusService,
    readonly ngxSmartModalService: NgxSmartModalService,) {
    this.subscribes.push(this.bus.of(SharePopupEvent).subscribe(this.sharePopupEvent.bind(this)));
    this.subscribes.push(this.bus.of(SharePopupCloseEvent).subscribe(this.sharePopupCloseEvent.bind(this)));
     }

  from !: string;
  username !: string;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  sharePopupEvent(event: SharePopupEvent){
    this.from = event.from;
    this.ngxSmartModalService.getModal('shareModal').open();
  }

  sharePopupCloseEvent(event: SharePopupCloseEvent){
    this.ngxSmartModalService.getModal('shareModal').close();
  }

}
