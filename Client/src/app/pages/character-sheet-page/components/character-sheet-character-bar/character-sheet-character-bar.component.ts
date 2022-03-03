import { Component, Input, OnInit } from '@angular/core';
import { CharacterDetail } from 'src/app/models/character-sheet.model';
import { Feature } from 'src/app/models/feature.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-sheet-character-bar',
  templateUrl: './character-sheet-character-bar.component.html',
  styleUrls: ['./character-sheet-character-bar.component.css']
})
export class CharacterSheetCharacterBarComponent implements OnInit {

  constructor() { }

  @Input() classColor!: string;
  @Input() image!: boolean;
  @Input() characterDetails!: CharacterDetail
  features!: Feature[];
  load: boolean = false;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  characterImageBasePath = this.apiURL + '/images/CharacterImages/';

  maxHealth!: number;

  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    this.findMaxHealth();
    if(features.length > 0)
      this.load = true;
  }

  findMaxHealth(){
    const maxHealthIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Max Health' && !isNaN(Number(i.Value)));
    this.maxHealth = maxHealthIndex !== -1 ? Number(this.features[maxHealthIndex].Value) : 0;


  }

  healthChange(e:any){
  }

}
