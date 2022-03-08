import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Abilities, AbilitiesProficiency, ProficiencyTypes } from 'src/app/models/character-sheet.model';
import { Feature } from 'src/app/models/feature.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import { saveCharacterAbilities, saveCharacterAbilitiesModifiers } from 'src/app/store/actions/character-sheet.action';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-character-sheet-abilities',
  templateUrl: './character-sheet-abilities.component.html',
  styleUrls: ['./character-sheet-abilities.component.css']
})
export class CharacterSheetAbilitiesComponent implements OnInit {

  constructor(readonly calculatorService: CalculatorService,
    readonly store: Store<{ state: State }>) { }

  @Input() classColor!: string;
  features!: Feature[];
  abilities: Abilities = {} as Abilities;
  abilitiesModifier: Abilities = {} as Abilities;
  savingThrows: Abilities = {} as Abilities;
  levelProficiency!: number;
  savingThrowsProficiency: AbilitiesProficiency = {
    Charisma: ProficiencyTypes.None,
    Constitution: ProficiencyTypes.None,
    Dexterity: ProficiencyTypes.None,
    Strength: ProficiencyTypes.None,
    Intelligence: ProficiencyTypes.None,
    Wisdom: ProficiencyTypes.None,
  } as AbilitiesProficiency
  savingThrowsModifier: Abilities = {} as Abilities;
  advantages: string[] = [];
  disadvantages: string[] = [];
  load: boolean = false;


  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    this.readAbilityValues();
    this.readSavingThrowValues();
    this.readProficiency();
    this.readSavingThrowProficiency();
    this.readSavingThrowVangates();
    this.calculateSavingThrowModifiers();
    if(features.length > 0)
      this.load = true;
  }

  readAbilityValues(){
    const strengthIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Strength' && !isNaN(Number(i.Value)));
    this.abilities.Strength = strengthIndex !== -1 ? Number(this.features[strengthIndex].Value) : 0;
    this.abilitiesModifier.Strength = this.calculatorService.calculateAbilityModifier(this.abilities.Strength);

    const dexterityIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Dexterity' && !isNaN(Number(i.Value)));
    this.abilities.Dexterity = dexterityIndex !== -1 ? Number(this.features[dexterityIndex].Value) : 0;
    this.abilitiesModifier.Dexterity = this.calculatorService.calculateAbilityModifier(this.abilities.Dexterity);

    const constitutionIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Constitution' && !isNaN(Number(i.Value)));
    this.abilities.Constitution = constitutionIndex !== -1 ? Number(this.features[constitutionIndex].Value) : 0;
    this.abilitiesModifier.Constitution = this.calculatorService.calculateAbilityModifier(this.abilities.Constitution);

    const charismaIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Charisma' && !isNaN(Number(i.Value)));
    this.abilities.Charisma = charismaIndex !== -1 ? Number(this.features[charismaIndex].Value) : 0;
    this.abilitiesModifier.Charisma = this.calculatorService.calculateAbilityModifier(this.abilities.Charisma);

    const intelligenceIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Intelligence' && !isNaN(Number(i.Value)));
    this.abilities.Intelligence = intelligenceIndex !== -1 ? Number(this.features[intelligenceIndex].Value) : 0;
    this.abilitiesModifier.Intelligence = this.calculatorService.calculateAbilityModifier(this.abilities.Intelligence);

    const wisdomIndex = this.features.findIndex(i => i.Section == 'Ability' && i.Type == 'Wisdom' && !isNaN(Number(i.Value)));
    this.abilities.Wisdom = wisdomIndex !== -1 ? Number(this.features[wisdomIndex].Value) : 0;
    this.abilitiesModifier.Wisdom = this.calculatorService.calculateAbilityModifier(this.abilities.Wisdom);

    this.store.dispatch(saveCharacterAbilities(this.abilities));
    this.store.dispatch(saveCharacterAbilitiesModifiers(this.abilitiesModifier));
  }

  readSavingThrowValues(){
    const strengthIndex = this.features.findIndex(i => i.Section == 'Saving Throw' && i.Type == 'Strength' && !isNaN(Number(i.Value)));
    this.savingThrows.Strength = strengthIndex !== -1 ? Number(this.features[strengthIndex].Value) : 0;

    const dexterityIndex = this.features.findIndex(i => i.Section == 'Saving Throw' && i.Type == 'Dexterity' && !isNaN(Number(i.Value)));
    this.savingThrows.Dexterity = dexterityIndex !== -1 ? Number(this.features[dexterityIndex].Value) : 0;

    const constitutionIndex = this.features.findIndex(i => i.Section == 'Saving Throw' && i.Type == 'Constitution' && !isNaN(Number(i.Value)));
    this.savingThrows.Constitution = constitutionIndex !== -1 ? Number(this.features[constitutionIndex].Value) : 0;

    const charismaIndex = this.features.findIndex(i => i.Section == 'Saving Throw' && i.Type == 'Charisma' && !isNaN(Number(i.Value)));
    this.savingThrows.Charisma = charismaIndex !== -1 ? Number(this.features[charismaIndex].Value) : 0;

    const intelligenceIndex = this.features.findIndex(i => i.Section == 'Saving Throw' && i.Type == 'Intelligence' && !isNaN(Number(i.Value)));
    this.savingThrows.Intelligence = intelligenceIndex !== -1 ? Number(this.features[intelligenceIndex].Value) : 0;

    const wisdomIndex = this.features.findIndex(i => i.Section == 'Saving Throw' && i.Type == 'Wisdom' && !isNaN(Number(i.Value)));
    this.savingThrows.Wisdom = wisdomIndex !== -1 ? Number(this.features[wisdomIndex].Value) : 0;

  }

  readProficiency(){
    const levelIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Level' && !isNaN(Number(i.Value)))
    const level = levelIndex !== -1 ? Number(this.features[levelIndex].Value) : 1;
    const proficiencyIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Proficiency' && !isNaN(Number(i.Value)))
    const proficiency = proficiencyIndex !== -1 ? Number(this.features[proficiencyIndex].Value) : 0;
    this.levelProficiency = this.calculatorService.calculateProficiency(level,proficiency);
  }

  readSavingThrowProficiency(){
    this.features.filter(i => i.Section == 'Saving Throw' && i.Value == 'Half-Proficient').forEach(e => {
      if(e.Type == 'Strength')
        this.savingThrowsProficiency.Strength = ProficiencyTypes.HalfProficiency;
      else if(e.Type == 'Dexterity')
        this.savingThrowsProficiency.Dexterity = ProficiencyTypes.HalfProficiency;
      else if(e.Type == 'Constitution')
        this.savingThrowsProficiency.Constitution = ProficiencyTypes.HalfProficiency;
      else if(e.Type == 'Charisma')
        this.savingThrowsProficiency.Charisma = ProficiencyTypes.HalfProficiency;
      else if(e.Type == 'Intelligence')
        this.savingThrowsProficiency.Intelligence = ProficiencyTypes.HalfProficiency;
      else if(e.Type == 'Wisdom')
        this.savingThrowsProficiency.Wisdom = ProficiencyTypes.HalfProficiency;
    })

    this.features.filter(i => i.Section == 'Saving Throw' && i.Value == 'Proficient').forEach(e => {
      if(e.Type == 'Strength')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Proficiency;
      else if(e.Type == 'Dexterity')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Proficiency;
      else if(e.Type == 'Constitution')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Proficiency;
      else if(e.Type == 'Charisma')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Proficiency;
      else if(e.Type == 'Intelligence')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Proficiency;
      else if(e.Type == 'Wisdom')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Proficiency;
    })

    this.features.filter(i => i.Section == 'Saving Throw' && i.Value == 'Expertise').forEach(e => {
      if(e.Type == 'Strength')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Expertise;
      else if(e.Type == 'Dexterity')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Expertise;
      else if(e.Type == 'Constitution')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Expertise;
      else if(e.Type == 'Charisma')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Expertise;
      else if(e.Type == 'Intelligence')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Expertise;
      else if(e.Type == 'Wisdom')
        this.savingThrowsProficiency[e.Type] = ProficiencyTypes.Expertise;
    })
  }

  readSavingThrowVangates(){
    this.features.filter(i => i.Section == 'Saving Throw' && i.Type == 'Advantage').forEach(e => {
      this.advantages.push(e.Value);
    })
    this.features.filter(i => i.Section == 'Saving Throw' && i.Type == 'Disadvantage').forEach(e => {
      this.disadvantages.push(e.Value);
    })
  }

  calculateSavingThrowModifiers(){
    this.savingThrowsModifier.Strength = this.calculatorService.calculateModifier(this.savingThrows.Strength,this.abilitiesModifier.Strength,this.savingThrowsProficiency.Strength,this.levelProficiency);
    this.savingThrowsModifier.Dexterity = this.calculatorService.calculateModifier(this.savingThrows.Dexterity,this.abilitiesModifier.Dexterity,this.savingThrowsProficiency.Dexterity,this.levelProficiency);
    this.savingThrowsModifier.Charisma = this.calculatorService.calculateModifier(this.savingThrows.Charisma,this.abilitiesModifier.Charisma,this.savingThrowsProficiency.Charisma,this.levelProficiency);
    this.savingThrowsModifier.Constitution = this.calculatorService.calculateModifier(this.savingThrows.Constitution,this.abilitiesModifier.Constitution,this.savingThrowsProficiency.Constitution,this.levelProficiency);
    this.savingThrowsModifier.Wisdom = this.calculatorService.calculateModifier(this.savingThrows.Wisdom,this.abilitiesModifier.Wisdom,this.savingThrowsProficiency.Wisdom,this.levelProficiency);
    this.savingThrowsModifier.Intelligence = this.calculatorService.calculateModifier(this.savingThrows.Intelligence,this.abilitiesModifier.Intelligence,this.savingThrowsProficiency.Intelligence,this.levelProficiency);
  }


  getModifierNumberWithSign(modifier: number): string {
    const numberAbsolute = Math.abs(modifier);
    const sign : string = modifier >= 0 ? '+' : '-';
    return sign + numberAbsolute;
  }

  getProficiencyIcon(proficiency: ProficiencyTypes): string{
    if(proficiency == ProficiencyTypes.None)
      return "bi bi-circle";
    else if(proficiency == ProficiencyTypes.HalfProficiency)
      return "bi bi-circle-half";
    else if(proficiency == ProficiencyTypes.Proficiency)
      return "bi bi-circle-fill";
    else
      return "bi bi-square-fill";
  }

}
