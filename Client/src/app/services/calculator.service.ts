import { Injectable } from "@angular/core"
import { ProficiencyTypes } from "../models/character-sheet.model";



@Injectable({
  providedIn: "root"
})
export class CalculatorService {
  constructor() {  }

  calculateAbilityModifier(ability: number): number{
    return Math.floor((ability - 10) / 2);
  }

  calculateModifier(raw: number, abilityModifier: number, proficiency: ProficiencyTypes, levelProficiency: number){
    let proficiencyValue = 0;
    if(proficiency == ProficiencyTypes.HalfProficiency)
      proficiencyValue = levelProficiency / 2;
    else if(proficiency == ProficiencyTypes.Proficiency)
      proficiencyValue = levelProficiency;
    else if(proficiency == ProficiencyTypes.Expertise)
      proficiencyValue = levelProficiency * 2;
    return raw + abilityModifier + proficiencyValue;
  }

  calculateProficiency(level: number): number{
    return 2 + Math.floor((level - 1)/4)
  }

}