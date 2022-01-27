import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SubscriptionLike } from 'rxjs';
import { FeatureClosePopupEvent, FeaturePopupEvent } from 'src/app/events/feature.popup.event';
import { FeaturesPopupEvent, FeaturesClosePopupEvent } from 'src/app/events/features.popup.event';
import { Feature, Requirement } from 'src/app/models/feature.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { FeatureService } from 'src/app/services/feature.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-feature-popup',
  templateUrl: './feature-popup.component.html',
  styleUrls: ['./feature-popup.component.css']
})
export class FeaturePopupComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  feature!: Feature;
  from!: string;
  id: number | undefined;

  section!: string;
  type!: string;
  value!: string;
  note!: string;
  requirements!: Requirement[];

  sectionOptions: string[] = [];

  typeOptions!: any;
  typeOptionsForRequirements!: any;

  constructor(readonly bus: MessageBusService,
    readonly ngxSmartModalService: NgxSmartModalService,
    readonly alertService: AlertService,
    readonly featureService: FeatureService) {
    this.subscribes.push(this.bus.of(FeaturePopupEvent).subscribe(this.featuresPopupEvent.bind(this)));
  }

  async ngOnInit(): Promise<void> {
    this.sectionOptions = await this.featureService.getSections();
    this.typeOptions = await this.featureService.getTypes();
    this.typeOptionsForRequirements = await this.featureService.getTypesForRequirements();
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  featuresPopupEvent(featureEvent: FeaturePopupEvent) {
    this.feature = JSON.parse(JSON.stringify(featureEvent.feature));
    this.from = featureEvent.from;
    this.id = featureEvent.id;
    if (this.feature != null)
      this.featuresToModels();
    this.ngxSmartModalService.getModal('featureModal').open();
  }

  featuresToModels() {
    this.section = this.feature.Section;
    this.type = this.feature.Type;
    this.value = this.feature.Value;
    this.note = this.feature.Note;
    if (this.feature.Requirements != null && this.feature.Requirements)
      this.requirements = this.feature.Requirements;
    else
      this.requirements = [];
  }


  modelsToFeatures(): boolean {
    if (!this.controlModels()) {
      return false;
    }
    this.feature = {
      Section: this.section,
      Type: this.type,
      Value: this.value,
      Note: this.note,
      Requirements: this.requirements ? this.requirements : []
    }
    return true;
  }

  controlModels(): boolean {
    if (!this.section || !this.type || !this.value) {
      this.alertService.alert({ alertInfo: { message: 'Feature is invalid. Please check your values', type: 'warning', timeout: 3000 } })
      return false;
    }
    if (this.requirements != null || this.requirements) {
      for (let q = 0; q < this.requirements.length; q++) {
        if (!this.requirements[q].Section || !this.requirements[q].Type || !this.requirements[q].Value) {
          this.alertService.alert({ alertInfo: { message: 'Feature is invalid. Please check your values', type: 'warning', timeout: 3000 } })
          return false;
        }
      }
    }
    return true;
  }

  onClose() {
    this.ngxSmartModalService.getModal('featureModal').close();
  }

  save() {
    if (this.modelsToFeatures() && this.id) {
      this.bus.publish(new FeatureClosePopupEvent(this.from, this.id, this.feature));
      this.onClose();
    }

  }
  addRequirement() {
    this.requirements.push({
      Section: "",
      Type: "",
      Value: ""
    });
  }

  deleteRequirement(requirementIndex: number) {
    this.requirements.splice(requirementIndex, 1);
  }

}
