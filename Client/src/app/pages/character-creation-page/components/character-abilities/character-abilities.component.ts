import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterFeature, UpdateCharacterAbilitiesRequest } from 'src/app/models/character.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-abilities',
  templateUrl: './character-abilities.component.html',
  styleUrls: ['./character-abilities.component.css']
})
export class CharacterAbilitiesComponent implements OnInit {

  constructor(readonly characterService: CharacterService,
    readonly calculatorService: CalculatorService,
    readonly alertService: AlertService) { }

  @Input() characterId!: number;

  abilityNames: string[] = ['Strength', 'Dexterity', 'Constitution', 'Charisma', 'Intelligence', 'Wisdom'];
  modifiers: { [ability: string]: number; } = {};
  abilities: { [ability: string]: CharacterFeature; } = {};
  modifierValue: { [ability: string]: string; } = {};
  load: boolean = false;
  asd: CharacterFeature[] = [];

  async ngOnInit(): Promise<void> {
    const result = await this.characterService.getCharacterAbilities(this.characterId);
    this.abilityNames.forEach(e => {
      this.abilities[e] = result.filter(i => i.Note == e)[0];
      this.modifiers[e] = this.calculatorService.calculateAbilityModifierRaw(Number(this.abilities[e].Feature.Value));
      this.calculateModifier(this.abilities[e].Feature.Value,e);
      this.asd.push(this.abilities[e]);
    })
    this.load = true;
  }
  
  getModifierNumberWithSign(modifier: number): string {
    const numberAbsolute = Math.abs(modifier);
    const sign : string = modifier >= 0 ? '+' : '-';
    return sign + numberAbsolute;
  }

  calculateModifier(abilityValue: string, ability: string){
    const convertedAbilityValue =  Number(abilityValue);
    this.modifiers[ability] = this.calculatorService.calculateAbilityModifierRaw(convertedAbilityValue);
    this.modifierValue[ability] = this.getModifierNumberWithSign(this.modifiers[ability]);
  }

  async save(){
    const request : UpdateCharacterAbilitiesRequest = {
      CharacterAbilities: []
    };
    this.abilityNames.forEach(e => {
      request.CharacterAbilities.push(this.abilities[e]);
    })
    
    const result = await this.characterService.updateCharacterAbilities(request);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })

  }

  zzz(){
    console.log(this.asd);
  }
}
