import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from 'src/app/events/features.popup.event';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { CharacterClass, ClassDetail, ClassUpdateRequest } from 'src/app/models/class.model';
import { ShareRequest } from 'src/app/models/common/common.model';
import { ClassService } from 'src/app/services/class.service';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { UploadService } from 'src/app/services/common/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-class-accordion',
  templateUrl: './class-accordion.component.html',
  styleUrls: ['./class-accordion.component.css'],
  animations: [
    trigger(
      'detailsToggle', [
      transition(':enter', [
        style({ height: 0 }),
        animate('400ms', style({ height: 600 }))
      ]),
      transition(':leave', [
        style({ height: 600 }),
        animate('400ms', style({ height: 0 }))
      ])
    ],
    ),
  ]
})
export class ClassAccordionComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly classService: ClassService,
    readonly uploadService: UploadService,
    readonly alertService: AlertService,
    readonly bus: MessageBusService,
    readonly confirmationService: ConfirmationService) {
    this.subscribes.push(this.bus.of(FeaturesClosePopupEvent).subscribe(this.featuresPopupSaved.bind(this)));
    this.subscribes.push(this.bus.of(SharePopupUsernameEvent).subscribe(this.sharePopupResponse.bind(this)));
  }

  @Input() class!: CharacterClass;
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

  classDetail!: ClassDetail;

  detailsToggle: boolean = false;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  classImageBasePath = this.apiURL + '/images/classImages/';

  abilities!: string[];

  async ngOnInit(): Promise<void> {
    this.abilities = await this.classService.getAbilities();
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  featuresClick() {
    if (this.classDetail)
      this.bus.publish(new FeaturesPopupEvent('classId:' + this.classDetail.Id.toString(), this.classDetail.Features));
  }

  featuresPopupSaved(event: FeaturesClosePopupEvent) {
    if (this.classDetail && event.to == 'classId:' + this.classDetail.Id.toString()) {
      this.classDetail.Features = JSON.parse(JSON.stringify(event.features));
    }
  }

  async addImage(e: any) {
    if (this.class) {
      this.uploadService.uploadClassImage(e.target.files[0], this.class.Id).toPromise().then(i => {
        this.class.HasImage = true;
      });
    }
  }

  async detailsClick() {
    console.log(this.class.Color)
    this.detailsToggle = !this.detailsToggle;
    if (!this.classDetail && this.class) {
      this.classDetail = await this.classService.getClassDetail(this.class.Id);
    }
  }


  async save() {
    if (!this.classDetail)
      return;
    const request = {
      Id: this.class.Id,
      Color: this.class.Color,
      Description: this.classDetail.Description,
      HitDie: this.classDetail.HitDie,
      Name: this.class.Name,
      Saves: this.classDetail.Saves,
      PrimaryAbility: this.classDetail.PrimaryAbility,
      Features: this.classDetail.Features
    } as ClassUpdateRequest;

    const result = await this.classService.updateClass(request);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })
  }

  share() {
    if (this.classDetail)
      this.bus.publish(new SharePopupEvent('classId:' + this.classDetail.Id.toString()));
  }

  async sharePopupResponse(event: SharePopupUsernameEvent) {
    if (!this.classDetail || event.to !== 'classId:' + this.classDetail.Id.toString())
      return;
    const request = {
      ObjectId: this.classDetail.Id,
      Username: event.username
    } as ShareRequest;
    const result = await this.classService.shareClass(request);
    if (result == true) {
      this.bus.publish(new SharePopupCloseEvent());
      this.alertService.alert({ alertInfo: { message: 'This class successfully shared with ' + event.username, type: 'success', timeout: 5000 } });
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }

  }

  async deleteClass() {
    if (!this.classDetail)
      return;
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Class').toPromise().then(res => {
      if (res && this.classDetail)
        this.deleteClicked.emit(this.classDetail.Id);
    })
  }

}
