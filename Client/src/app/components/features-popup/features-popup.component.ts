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
  requirements: Requirement[][] = [[], []];

  sectionOptions!: string[];

  constructor(readonly bus: MessageBusService,
    readonly ngxSmartModalService: NgxSmartModalService,
    readonly alertService: AlertService,
    readonly featureService: FeatureService) {
    this.subscribes.push(this.bus.of(FeaturesPopupEvent).subscribe(this.featuresPopupEvent.bind(this)));
  }

  async ngOnInit(): Promise<void> {
    this.sectionOptions = await this.featureService.getSections();
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  gett(i: any[] | null) : any[]{
    if(i === null)
      return [];
    return i;
  }

  gettt(i: number) : any[]{
    return [this.section[i]];
  }


  featuresPopupEvent(featuresEvent: FeaturesPopupEvent) {
    this.features = JSON.parse(JSON.stringify(featuresEvent.features));
    this.from = featuresEvent.from;
    this.features.push({
      Section: 'Vilnius',
      Type: 'aaa',
      Value: 'zzz',
      Requirements: [{
        Section: 'sss',
        Type: 'qqq',
        Value: 'rrr'
      },
      {
        Section: 'zzz',
        Type: 'zzz2',
        Value: 'zzz3'
      }]
    })
    this.featuresToModels();
    this.ngxSmartModalService.getModal('featureModal').open();
  }

  featuresToModels() {
    this.features.forEach((e, i) => {
      this.section[i] = e.Section;
      this.type[i] = e.Type;
      this.value[i] = e.Value;
      if (e.Requirements != null)
        this.requirements[i] = e.Requirements;
      else
        this.requirements[i] = [];
    });
  }


  modelsToFeatures() {
    if(!this.controlModels()){
      return;
    }
    for (let i = 0; i < this.features.length; i++) {
      this.features[i] = {
        Section: this.section[i],
        Type: this.type[i],
        Value: this.value[i],
        Requirements: this.requirements[i]
      }
    }
    console.log(this.features);
  }

  controlModels(): boolean {
    for (let i = 0; i < this.features.length; i++) {
      if (!this.section[i] || !this.type[i] || !this.value) {
        this.alertService.alert({ alertInfo: { message: 'There are invalid Features. Please check feature number:' + (i + 1), type: 'warning', timeout: 3000 } })
        return false;
      }
      for (let q = 0; q < this.requirements[i].length; q++) {
        if (!this.requirements[i][q].Section || !this.requirements[i][q].Type || !this.requirements[i][q].Value) {
          this.alertService.alert({ alertInfo: { message: 'There are invalid Features. Please check feature number:' + (i + 1), type: 'warning', timeout: 3000 } })
        return false;
      }
      }
    }
    return true;
  }

  onClose() {
    this.bus.publish(new FeaturesClosePopupEvent(this.from, this.features));
    this.currentCollapse = 0;
  }

  save() {
    this.modelsToFeatures();
    //this.ngxSmartModalService.getModal('featureModal').close();
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
    this.requirements.splice(index, 1);
    this.features.splice(index, 1);
  }

  newFeature() {
    this.features.push({
      Section: '',
      Type: '',
      Value: '',
      Requirements: null
    })
    this.currentCollapse = this.features.length;
  }

  defaultBindingsList = [
    { value: 'Vilnius', label: 'Vilnius' },
    { value: 'Kaunas', label: 'Kaunas' },
    { value: 'Pavilnys', label: 'Pavilnys', disabled: true }
  ];

  deneme(i: number) {
    console.log(this.section[i], this.type[i], this.value[i], this.requirements[i]);
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
