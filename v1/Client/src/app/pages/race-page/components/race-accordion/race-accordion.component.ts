import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from 'src/app/events/features.popup.event';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { ShareRequest } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { Race, RaceDeleteRequest, RaceDetail, RaceUpdateRequest } from 'src/app/models/races.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { UploadService } from 'src/app/services/common/upload.service';
import { RaceService } from 'src/app/services/races.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-race-accordion',
  templateUrl: './race-accordion.component.html',
  styleUrls: ['./race-accordion.component.css'],
  animations: [
    trigger(
      'detailsToggle', [
      transition(':enter', [
        style({ height: 0 }),
        animate('400ms', style({ height: 800 }))
      ]),
      transition(':leave', [
        style({ height: 800 }),
        animate('400ms', style({ height: 0 }))
      ])
    ],
    ),
  ]
})
export class RaceAccordionComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly raceService: RaceService,
    readonly bus: MessageBusService,
    readonly alertService: AlertService,
    readonly uploadService: UploadService,
    readonly confirmationService: ConfirmationService) {
    this.subscribes.push(this.bus.of(FeaturesClosePopupEvent).subscribe(this.featuresPopupSaved.bind(this)));
    this.subscribes.push(this.bus.of(SharePopupUsernameEvent).subscribe(this.sharePopupResponse.bind(this)));
  }

  @Input() race!: Race;
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();


  detailsToggle: boolean = false;
  raceDetail: RaceDetail | undefined;


  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  raceImageBasePath = this.apiURL + '/images/raceImages/';

  imagePath !: string;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }


  async detailsClick() {
    this.detailsToggle = !this.detailsToggle;
    if (!this.raceDetail && this.race) {
      this.raceDetail = await this.raceService.getRaceDetail(this.race.Id);
    }
  }

  featuresClick() {
    if (this.raceDetail)
      this.bus.publish(new FeaturesPopupEvent('raceId:' + this.raceDetail.RaceId.toString(), this.raceDetail.Features));
  }

  featuresPopupSaved(event: FeaturesClosePopupEvent) {
    if (this.raceDetail && event.to == 'raceId:' + this.raceDetail.RaceId.toString()) {
      this.raceDetail.Features = JSON.parse(JSON.stringify(event.features));
    }
  }

  async save() {
    if (!this.raceDetail)
      return;
    const request = {
      RaceId: this.raceDetail.RaceId,
      Name: this.race.Name,
      Description: this.raceDetail.Description,
      Size: this.raceDetail.Size,
      Speed: this.raceDetail.Speed,
      Features: this.raceDetail.Features
    } as RaceUpdateRequest;

    const result = await this.raceService.updateRace(request);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })
  }

  async addImage(e: any) {
    if (this.race) {
      this.uploadService.uploadRaceImage(e.target.files[0], this.race.Id).toPromise().then(i => {
        this.race.HasImage = true;
      });
    }
  }

  share() {
    if (this.raceDetail)
      this.bus.publish(new SharePopupEvent('raceId:' + this.raceDetail.RaceId.toString()));
  }

  async sharePopupResponse(event: SharePopupUsernameEvent) {
    if (!this.raceDetail || event.to !== 'raceId:' + this.raceDetail.RaceId.toString())
      return;
    const request = {
      ObjectId: this.raceDetail.RaceId,
      Username: event.username
    } as ShareRequest;
    const result = await this.raceService.shareRace(request);
    if (result == true) {
      this.bus.publish(new SharePopupCloseEvent());
      this.alertService.alert({ alertInfo: { message: 'This race successfully shared with ' + event.username, type: 'success', timeout: 5000 } });
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }

  }

  async deleteRace() {
    if (!this.raceDetail)
      return;
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Race').toPromise().then(res => {
      if (res && this.raceDetail)
        this.deleteClicked.emit(this.raceDetail.RaceId);
    })
  }


}
