import { Component, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FeatureRefresh } from 'src/app/events/features.popup.event';
import { CharacterFeature } from 'src/app/models/character.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';

@Component({
  selector: 'app-feature-panel',
  templateUrl: './feature-panel.component.html',
  styleUrls: ['./feature-panel.component.css']
})
export class FeaturePanelComponent implements OnInit {

  constructor(readonly bus: MessageBusService,
    readonly iterableDiffers: IterableDiffers) {
  }


  iterableDiffer!: any;
  @Input() characterFeatures!: CharacterFeature[];
  @Input() characterId!: number;
  from: string = 'CharacterSheetFeaturePanel';
  note: string = 'ExtraFeature'


  ngOnInit(): void {
    this.iterableDiffer = this.iterableDiffers.find([]).create();
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.characterFeatures);
    if (changes) {
      this.refreshFeatures();
    }
  }

  refreshFeatures() {
    this.bus.publish(new FeatureRefresh(this.characterFeatures));
  }

}
