import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from 'src/app/events/features.popup.event';
import { SharePopupEvent } from 'src/app/events/share.popup.event';
import { Race, RaceDetail, RaceUpdateRequest } from 'src/app/models/races.model';
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
        animate('200ms', style({ height: 100 }))
      ]),
      transition(':leave', [
        style({ height: 300 }),
        animate('200ms', style({ height: 0 }))
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
    readonly uploadService: UploadService) {
    this.subscribes.push(this.bus.of(FeaturesClosePopupEvent).subscribe(this.featuresPopupSaved.bind(this)));
  }

  @Input() race!: Race;

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
    console.log(this.race);
    this.detailsToggle = !this.detailsToggle;
    if (!this.raceDetail && this.race) {
      this.raceDetail = await this.raceService.getRaceDetail(this.race.Id);
    }
  }

  featuresClick() {
    if (this.raceDetail)
      this.bus.publish(new FeaturesPopupEvent('raceId:' + this.raceDetail.RaceId.toString(), this.raceDetail.Features));
  }

  featuresPopupSaved(featuresClosePopupEvent: FeaturesClosePopupEvent) {
    if (this.raceDetail && featuresClosePopupEvent.to == 'raceId:' + this.raceDetail.RaceId.toString()) {
      this.raceDetail.Features = JSON.parse(JSON.stringify(featuresClosePopupEvent.features));
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


}
