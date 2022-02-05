import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from 'src/app/events/features.popup.event';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { ShareRequest } from 'src/app/models/common/common.model';
import { TraitWithFeature } from 'src/app/models/traits.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { TraitsService } from 'src/app/services/traits.service';

@Component({
  selector: 'app-trait-sheet',
  templateUrl: './trait-sheet.component.html',
  styleUrls: ['./trait-sheet.component.css']
})
export class TraitSheetComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly traitService: TraitsService,
    readonly bus: MessageBusService,
    readonly alertService: AlertService,
    readonly confirmationService: ConfirmationService) { }

  traitDetail !: TraitWithFeature;

  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() saveClicked: EventEmitter<TraitWithFeature> = new EventEmitter<TraitWithFeature>();


  ngOnInit(): void {
    this.subscribes.push(this.bus.of(FeaturesClosePopupEvent).subscribe(this.featuresPopupSaved.bind(this)));
    this.subscribes.push(this.bus.of(SharePopupUsernameEvent).subscribe(this.sharePopupResponse.bind(this)));
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }


  @Input() set selectedTrait(id: number) {
    this.readTraitDetail(id);
  }

  async readTraitDetail(id: number) {
    this.traitDetail = await this.traitService.getTrait(id);
  }

  featuresClick() {
    if (this.traitDetail)
      this.bus.publish(new FeaturesPopupEvent('traitId:' + this.traitDetail.Id.toString(), this.traitDetail.Features));
  }

  featuresPopupSaved(event: FeaturesClosePopupEvent) {
    if (this.traitDetail && event.to == 'traitId:' + this.traitDetail.Id.toString()) {
      this.traitDetail.Features = JSON.parse(JSON.stringify(event.features));
    }
  }

  save() {
    this.saveClicked.emit(this.traitDetail);
  }

  async deleteTrait() {
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Trait').toPromise().then(res => {
      if (res && this.traitDetail)
        this.deleteClicked.emit(this.traitDetail.Id);
    })
  }

  share() {
    if (this.traitDetail)
      this.bus.publish(new SharePopupEvent('traitId:' + this.traitDetail.Id.toString()));
  }

  async sharePopupResponse(event: SharePopupUsernameEvent) {
    if (!this.traitDetail || event.to !== 'traitId:' + this.traitDetail.Id.toString())
      return;
    const request = {
      ObjectId: this.traitDetail.Id,
      Username: event.username
    } as ShareRequest;
    const result = await this.traitService.shareTrait(request);
    if (result == true) {
      this.bus.publish(new SharePopupCloseEvent());
      this.alertService.alert({ alertInfo: { message: 'This trait successfully shared with ' + event.username, type: 'success', timeout: 5000 } });
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }
  }

}
