import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SubscriptionLike } from 'rxjs';
import { FeaturesPopupEvent, FeaturesClosePopupEvent } from 'src/app/events/features.popup.event';
import { Feature, Requirement } from 'src/app/models/feature.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { FeatureService } from 'src/app/services/feature.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-features-popup',
  templateUrl: './features-popup.component.html',
  styleUrls: ['./features-popup.component.css']
})
export class FeaturesPopupComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  features!: Feature[];
  from!: string;
  currentCollapse: number = 0;

  section: string[] = [];
  type: string[] = [];
  value: string[] = [];
  note: string[] = [];
  requirements: Requirement[][] = [[], []];

  sectionOptions!: string[];

  typeOptions!: any;
  typeOptionsForRequirements!: any;

  constructor(readonly bus: MessageBusService,
    readonly ngxSmartModalService: NgxSmartModalService,
    readonly alertService: AlertService,
    readonly featureService: FeatureService) {
    this.subscribes.push(this.bus.of(FeaturesPopupEvent).subscribe(this.featuresPopupEvent.bind(this)));
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

  featuresPopupEvent(featuresEvent: FeaturesPopupEvent) {
    this.features = JSON.parse(JSON.stringify(featuresEvent.features));
    this.from = featuresEvent.from;
    if (this.features != null)
      this.featuresToModels();
    else
      this.features = [];
    this.ngxSmartModalService.getModal('featureModal').open();
  }

  featuresToModels() {
    this.features.forEach((e, i) => {
      this.section[i] = e.Section;
      this.type[i] = e.Type;
      this.value[i] = e.Value;
      this.note[i] = e.Note;
      if (e.Requirements != null && e.Requirements)
        this.requirements[i] = e.Requirements;
      else
        this.requirements[i] = [];
    });
  }


  modelsToFeatures(): boolean {
    if (!this.controlModels()) {
      return false;
    }
    for (let i = 0; i < this.features.length; i++) {
      this.features[i] = {
        Section: this.section[i],
        Type: this.type[i],
        Value: this.value[i],
        Note: this.note[i],
        Requirements: this.requirements[i] ? this.requirements[i] : []
      }
    }
    return true;
  }

  controlModels(): boolean {
    for (let i = 0; i < this.features.length; i++) {
      if (!this.section[i] || !this.type[i] || !this.value) {
        this.alertService.alert({ alertInfo: { message: 'There are invalid Features. Please check feature number:' + (i + 1), type: 'warning', timeout: 3000 } })
        return false;
      }
      if (this.requirements[i] != null || this.requirements[i]) {
        for (let q = 0; q < this.requirements[i].length; q++) {
          if (!this.requirements[i][q].Section || !this.requirements[i][q].Type || !this.requirements[i][q].Value) {
            this.alertService.alert({ alertInfo: { message: 'There are invalid Features. Please check feature number:' + (i + 1), type: 'warning', timeout: 3000 } })
            return false;
          }
        }
      }
    }
    return true;
  }

  onClose() {
    this.currentCollapse = 0;
    this.ngxSmartModalService.getModal('featureModal').close();
  }

  save() {
    if (this.modelsToFeatures()) {
      this.bus.publish(new FeaturesClosePopupEvent(this.from, this.features));
      this.onClose();
    }

  }

  changeCollapse(i: number) {
    if (this.currentCollapse == i)
      this.currentCollapse = 0;
    else
      this.currentCollapse = i;
  }

  removeFeature(index: number) {
    this.section.splice(index, 1);
    this.type.splice(index, 1);
    this.value.splice(index, 1);
    this.note.splice(index, 1);
    this.requirements.splice(index, 1);
    this.features.splice(index, 1);
    this.currentCollapse -= 1;
  }

  newFeature() {
    this.features.push({
      Section: '',
      Type: '',
      Value: '',
      Note: '',
      Requirements: []
    });
    const index = this.features.length - 1;
    this.section[index] = '';
    this.type[index] = '';
    this.value[index] = '';
    this.note[index] = '';
    this.requirements[index] = [];
    this.currentCollapse = this.features.length;
  }
  addRequirement(index: number) {
    this.requirements[index].push({
      Section: "",
      Type: "",
      Value: ""
    });
  }

  deleteRequirement(featureIndex: number, requirementIndex: number) {
    this.requirements[featureIndex].splice(requirementIndex, 1);
  }

}
