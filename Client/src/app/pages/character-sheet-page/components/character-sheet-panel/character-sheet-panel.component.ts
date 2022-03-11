import { Component, Input, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';

@Component({
  selector: 'app-character-sheet-panel',
  templateUrl: './character-sheet-panel.component.html',
  styleUrls: ['./character-sheet-panel.component.css']
})
export class CharacterSheetPanelComponent implements OnInit {

  constructor() { }

  @Input() classColor!: string;
  features!: Feature[];
  load!: boolean;
  clickedIndex = -1;

  tabs = [
    'Spells',
    'Inventory',
    'Features',
    'Description',
  ]


  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    if(features.length > 0)
      this.load = true;
  }

  pageClicked(index: number){
    console.log(index);
    this.clickedIndex = index;
  }

}
