import { Component, Input, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';

@Component({
  selector: 'app-character-sheet-miscellaneous-card',
  templateUrl: './character-sheet-miscellaneous-card.component.html',
  styleUrls: ['./character-sheet-miscellaneous-card.component.css']
})
export class CharacterSheetMiscellaneousCardComponent implements OnInit {

  constructor() { }

  @Input() classColor!: string;
  features!: Feature[];
  load: boolean = false;

  armorProficiencies!: string;
  weaponProficiency!: string;
  language!: string;
  tool!: string;
  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    this.readMiscs()
    if(features.length > 0)
      this.load = true;
  }

  readMiscs(){
    const armorProficiency = this.features.filter(i => i.Section == 'Character' && i.Type == 'Armor Proficiency');
    this.armorProficiencies = armorProficiency.map(i => i.Value).join(',');
    if(this.armorProficiencies == '')
    this.armorProficiencies = '-'

    const weaponProficiency = this.features.filter(i => i.Section == 'Character' && i.Type == 'Weapon Proficiency');
    this.weaponProficiency = weaponProficiency.map(i => i.Value).join(',');
    if(this.weaponProficiency == '')
    this.weaponProficiency = '-'

    const language = this.features.filter(i => i.Section == 'Character' && i.Type == 'Language');
    this.language = language.map(i => i.Value).join(',');
    if(this.language == '')
      this.language = '-'

    const tool = this.features.filter(i => i.Section == 'Character' && i.Type == 'Tool');
    this.tool = tool.map(i => i.Value).join(',');
    if(this.tool == '')
      this.tool = '-'

  }

}
