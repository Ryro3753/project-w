import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SubscriptionLike } from 'rxjs';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { User } from 'src/app/models/common/user.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { State } from 'src/app/store/reducer/reducer';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.css']
})
export class SharePopupComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly bus: MessageBusService,
    readonly ngxSmartModalService: NgxSmartModalService,
    readonly store: Store<{ state: State }>,
    readonly alertService: AlertService ) {
    this.subscribes.push(this.bus.of(SharePopupEvent).subscribe(this.sharePopupEvent.bind(this)));
    this.subscribes.push(this.bus.of(SharePopupCloseEvent).subscribe(this.sharePopupCloseEvent.bind(this)));
    this.subscribes.push(this.store.select('state').subscribe(i => {
      this.currentUser = i.user;
    }))
  }

  from !: string;
  username !: string;
  currentUser: User | undefined;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  sharePopupEvent(event: SharePopupEvent) {
    this.from = event.from;
    this.ngxSmartModalService.getModal('shareModal').open();
  }

  share(){
    if(this.checkSameUsername()){
      this.bus.publish(new SharePopupUsernameEvent(this.from,this.username));
    }
    else
      this.alertService.alert({alertInfo:{message:"You can't share the item with yourself",type:'warning'}});
  }

  checkSameUsername(): boolean{
    if(!this.currentUser || this.currentUser.Username == this.username)
      return false;
    return true;
  }

  sharePopupCloseEvent(event: SharePopupCloseEvent) {
    this.ngxSmartModalService.getModal('shareModal').close();
    this.username = '';
  }

}
