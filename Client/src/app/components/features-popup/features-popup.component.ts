import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SubscriptionLike } from 'rxjs';
import { FeaturesPopupEvent,FeaturesClosePopupEvent } from 'src/app/events/features.popup.event';
import { Feature } from 'src/app/models/feature.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';

@Component({
  selector: 'app-features-popup',
  templateUrl: './features-popup.component.html',
  styleUrls: ['./features-popup.component.css']
})
export class FeaturesPopupComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  features!: Feature[];
  from!: string;

  show: boolean = false;

  constructor(readonly bus: MessageBusService,
              readonly ngxSmartModalService: NgxSmartModalService) {
    this.subscribes.push(this.bus.of(FeaturesPopupEvent).subscribe(this.featuresPopupEvent.bind(this)));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  featuresPopupEvent(featuresEvent: FeaturesPopupEvent){
    this.show = true;
    this.features = featuresEvent.features;
    this.from = featuresEvent.from;
    this.ngxSmartModalService.getModal('myModal').open();
  }

  onClose(){
    this.show = false;
    this.bus.publish(new FeaturesClosePopupEvent("main",this.features));
  }

}
