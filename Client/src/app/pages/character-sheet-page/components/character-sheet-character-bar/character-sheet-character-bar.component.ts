import { Component, Input, OnInit } from '@angular/core';
import { CharacterDetail, Defense, DefenseTypes } from 'src/app/models/character-sheet.model';
import { Feature } from 'src/app/models/feature.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-sheet-character-bar',
  templateUrl: './character-sheet-character-bar.component.html',
  styleUrls: ['./character-sheet-character-bar.component.css']
})
export class CharacterSheetCharacterBarComponent implements OnInit {

  constructor(readonly calculatorService: CalculatorService) { }

  @Input() classColor!: string;
  @Input() image!: boolean;
  @Input() characterDetails!: CharacterDetail
  features!: Feature[];
  load: boolean = false;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  characterImageBasePath = this.apiURL + '/images/CharacterImages/';

  maxHealth!: number;
  maxMana!: number;
  proficiency!: number;
  level!: number;
  initiative!: number;
  speed!: number;
  defenses!: Defense[];
  conditions!: string[];

  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]) {
    this.features = features;
    this.findMaxHealth();
    this.findLevel();
    this.findProficiency();
    this.findInitiative();
    this.findSpeed();
    this.findDefenseAndConditions();
    if (features.length > 0)
      this.load = true;
  }

  findMaxHealth() {
    const maxHealthIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Max Health' && !isNaN(Number(i.Value)));
    this.maxHealth = maxHealthIndex !== -1 ? Number(this.features[maxHealthIndex].Value) : 0;
    if (this.characterDetails && this.characterDetails.CurrentHealth == -1) {
      this.characterDetails.CurrentHealth = this.maxHealth;
    }

    const maxManaIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Max Health' && !isNaN(Number(i.Value)));
    this.maxMana = maxManaIndex !== -1 ? Number(this.features[maxManaIndex].Value) : 0;
    if (this.characterDetails && this.characterDetails.CurrentMana == -1) {
      this.characterDetails.CurrentMana = this.maxMana;
    }
  }

  healthChange(e: any) {
    this.characterDetails.CurrentHealth = e;
  }

  findLevel() {
    const levelIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Level' && !isNaN(Number(i.Value)))
    this.level = levelIndex !== -1 ? Number(this.features[levelIndex].Value) : 1;
  }

  findProficiency() {
    const proficiencyIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Proficiency' && !isNaN(Number(i.Value)))
    const proficiency = proficiencyIndex !== -1 ? Number(this.features[proficiencyIndex].Value) : 0;
    this.proficiency = this.calculatorService.calculateProficiency(this.level, proficiency);
  }

  findInitiative() {
    const initiativeIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Initiative' && !isNaN(Number(i.Value)))
    const initiative = initiativeIndex !== -1 ? Number(this.features[initiativeIndex].Value) : 0;
    const dexterityIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Dexterity' && !isNaN(Number(i.Value)))
    const dexterity = dexterityIndex !== -1 ? Number(this.features[dexterityIndex].Value) : 0;
    const dexterityModifier = this.calculatorService.calculateAbilityModifier(dexterity);
    this.initiative = initiative + dexterityModifier;
  }

  findSpeed() {
    const speedIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Speed' && !isNaN(Number(i.Value)))
    const speed = speedIndex !== -1 ? Number(this.features[speedIndex].Value) : 0;
    this.speed = speed + this.characterDetails.Speed;
  }

  calculateArmorClass() {

  }

  findDefenseAndConditions() {
    const conditions = this.features.filter(i => i.Section == 'Condition' && i.Type == 'Gain');
    this.conditions = [];
    this.conditions = conditions.map(i => i.Value);
    const defenses = this.features.filter(i => i.Section == 'Defense');
    this.defenses = [];
    defenses.forEach(e => {
      if (e.Type == 'Resistance')
        this.defenses.push({
          DefenseType: DefenseTypes.Resistance,
          Name: e.Value
        })
      else if(e.Type == 'Immunity')
      this.defenses.push({
        DefenseType: DefenseTypes.Immunity,
        Name: e.Value
      })
      else
      this.defenses.push({
        DefenseType: DefenseTypes.Vulnerability,
        Name: e.Value
      })
    })
    this.defenses.push({
      DefenseType: DefenseTypes.Immunity,
      Name:'aaaaaa'
    })
    this.defenses.push({
      DefenseType: DefenseTypes.Resistance,
      Name:'bbbbbbb'
    })
    this.defenses.push({
      DefenseType: DefenseTypes.Vulnerability,
      Name:'cccccc'
    })
  }

  getDefenseType(def: DefenseTypes): string{
    if(def == DefenseTypes.Immunity)
      return 'I';
    else if(def == DefenseTypes.Resistance)
      return 'R';
    else
      return 'V';
  }

  getDefenseStyle(def: DefenseTypes){
    let fontColor = '';
    if(def == DefenseTypes.Immunity)
      fontColor = 'Blue'
    else if(def == DefenseTypes.Resistance)
      fontColor = 'Green'
    else if(def == DefenseTypes.Vulnerability)
      fontColor = 'Red'
    
    return {'border-color': this.classColor, 'color': fontColor}
  }

  getModifierNumberWithSign(modifier: number): string {
    const numberAbsolute = Math.abs(modifier);
    const sign: string = modifier >= 0 ? '+' : '-';
    return sign + numberAbsolute;
  }

}
