import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { FeatureClosePopupEvent, FeaturePopupEvent } from 'src/app/events/feature.popup.event';
import { CharacterFeature } from 'src/app/models/character.model';
import { Feature } from 'src/app/models/feature.model';
import { CharacterService } from 'src/app/services/character.service';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { AlertService } from '../alert/alert.service';
import { ConfirmationService } from '../confirmation/confirmation.service';

@Component({
  selector: 'app-character-feature-list',
  templateUrl: './character-feature-list.component.html',
  styleUrls: ['./character-feature-list.component.css']
})
export class CharacterFeatureListComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly confirmationService: ConfirmationService,
    readonly bus: MessageBusService,
    readonly characterService: CharacterService,
    readonly alertService: AlertService) {
    this.subscribes.push(this.bus.of(FeatureClosePopupEvent).subscribe(this.featurePopupClose.bind(this)));
  }

  @Output() characterFeaturesChange = new EventEmitter<CharacterFeature[]>();
  @Input() characterFeatures!: CharacterFeature[];
  @Input() height: number = 150;
  @Input() from!: string;
  @Input() characterId!: number;
  @Input() note: string = '';

  showRequirementsToggle: boolean[] = [];

  cssClassesWithoutRequirement: string = 'list-group-item listItem';
  cssClassesWithRequirement: string = this.cssClassesWithoutRequirement + ' listItemWithRequirements click';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  showRequirements(feature: CharacterFeature, index: number) {
    if (feature.Feature.Requirements == null || !feature.Feature.Requirements || feature.Feature.Requirements.length == 0)
      return;
    this.showRequirementsToggle[index] = !this.showRequirementsToggle[index];
  }

  addFeature() {
    this.bus.publish(new FeaturePopupEvent(this.from, 0, {} as Feature))
  }

  async deleteFeature(id: number) {
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Feature').toPromise().then(async res => {
      if(res){
        const isDeleted = await this.characterService.deleteCharacterFeatures(id);
        if(isDeleted){
          const index = this.characterFeatures.findIndex(i => i.Id == id);
          this.characterFeatures.splice(index,1);
          this.alertService.alert({alertInfo:{message:'Feature successfully deleted', type:'success'}});
        }
        else
          this.alertService.alert({alertInfo:{message:'Something wrong happend, please try again later', type:'danger'}});
      }

    });
  }

  editFeature(id: number) {
    const feature = this.characterFeatures.filter(i => i.Id == id)[0].Feature;
    this.bus.publish(new FeaturePopupEvent(this.from, id, feature));
  }

  async featurePopupClose(event: FeatureClosePopupEvent){
    //new inserted
    if(event.id == 0){
      const result = await this.characterService.insertCharacterFeature({
        CharacterId: this.characterId,
        Feature: event.feature,
        Note: this.note
      });
      this.characterFeatures.push(result);
    }
    else {
      const result = await this.characterService.updateCharacterFeature({
        Id: event.id,
        CharacterId: this.characterId,
        Feature: event.feature,
        Note: this.note
      });
      const index = this.characterFeatures.findIndex(i => i.Id == result.Id);
      this.characterFeatures[index] = result;
    }
  }
}
