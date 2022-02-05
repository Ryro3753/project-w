import { Component, Input, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';

@Component({
  selector: 'app-character-sheet-abilities',
  templateUrl: './character-sheet-abilities.component.html',
  styleUrls: ['./character-sheet-abilities.component.css']
})
export class CharacterSheetAbilitiesComponent implements OnInit {

  constructor() { }

  features!: Feature[];
  strength!: number;
  dexterity!: number;
  constitution!: number;
  charisma!: number;
  intelligence!: number;
  wisdom!: number;

  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    this.readAbilityValues();
  }

  readAbilityValues(){
    console.log(this.features);
    const strengthIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Strength' && !isNaN(Number(i.Value)));
    this.strength = strengthIndex !== -1 ? Number(this.features[strengthIndex].Value) : 0;

    const dexterityIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Dexterity' && !isNaN(Number(i.Value)));
    this.dexterity = dexterityIndex !== -1 ? Number(this.features[dexterityIndex].Value) : 0;

    const constitutionIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Constitution' && !isNaN(Number(i.Value)));
    this.constitution = constitutionIndex !== -1 ? Number(this.features[constitutionIndex].Value) : 0;

    const charismaIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Charisma' && !isNaN(Number(i.Value)));
    this.charisma = charismaIndex !== -1 ? Number(this.features[charismaIndex].Value) : 0;

    const intelligenceIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Intelligence' && !isNaN(Number(i.Value)));
    this.intelligence = intelligenceIndex !== -1 ? Number(this.features[intelligenceIndex].Value) : 0;

    const wisdomIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Wisdom' && !isNaN(Number(i.Value)));
    this.wisdom = wisdomIndex !== -1 ? Number(this.features[wisdomIndex].Value) : 0;

    console.log(this.strength, this.dexterity, this.constitution, this.charisma, this.intelligence, this.wisdom);
  }


}
