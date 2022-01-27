import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CharacterFeature } from 'src/app/models/character.model';
import { ConfirmationService } from '../confirmation/confirmation.service';

@Component({
  selector: 'app-character-feature-list',
  templateUrl: './character-feature-list.component.html',
  styleUrls: ['./character-feature-list.component.css']
})
export class CharacterFeatureListComponent implements OnInit {

  constructor(readonly confirmationService: ConfirmationService) { }

  @Output() characterFeaturesChange = new EventEmitter<CharacterFeature[]>();
  @Input() characterFeatures!: CharacterFeature[];
  @Input() height: number = 150;

  showRequirementsToggle: boolean[] = [];

  cssClassesWithoutRequirement: string = 'list-group-item listItem';
  cssClassesWithRequirement: string = this.cssClassesWithoutRequirement + ' listItemWithRequirements click';

  ngOnInit(): void {
  }

  showRequirements(feature: CharacterFeature, index: number) {
    if (feature.Feature.Requirements == null || !feature.Feature.Requirements || feature.Feature.Requirements.length == 0)
      return;
    this.showRequirementsToggle[index] = !this.showRequirementsToggle[index];
  }

  addFeature() {
    this.characterFeatures.push({} as CharacterFeature);
  }

  async deleteFeature(index: number) {
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Feature').toPromise().then(async res => {
      this.characterFeatures.splice(index, 1);
    });
  }


}
