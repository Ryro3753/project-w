import { Component, Input, OnInit } from '@angular/core';
import { CharacterApperance, CharacterDescription, CharacterFeature } from 'src/app/models/character.model';
import { Feature } from 'src/app/models/feature.model';
import { SpellDetail } from 'src/app/models/spell.model';

@Component({
  selector: 'app-character-sheet-panel',
  templateUrl: './character-sheet-panel.component.html',
  styleUrls: ['./character-sheet-panel.component.css']
})
export class CharacterSheetPanelComponent implements OnInit {

  constructor() { }

  features!: Feature[];
  load!: boolean;
  clickedIndex = -1;
  @Input() classColor!: string;
  @Input() characterFeatures!: CharacterFeature[];
  @Input() characterApperance!: CharacterApperance;
  @Input() characterDescription!: CharacterDescription;
  @Input() allSpells!: SpellDetail[];
  @Input() characterId!: number;

  tabs = [
    'Spells',
    'Inventory',
    'Features',
    'Apperance',
    'Character Details',
  ]


  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    if(features.length > 0)
      this.load = true;
  }

  pageClicked(index: number){
    this.clickedIndex = index;
  }



}
