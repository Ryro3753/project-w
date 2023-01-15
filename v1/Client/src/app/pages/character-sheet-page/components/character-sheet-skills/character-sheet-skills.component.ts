import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { Abilities, ProficiencyTypes } from 'src/app/models/character-sheet.model';
import { Feature } from 'src/app/models/feature.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-character-sheet-skills',
  templateUrl: './character-sheet-skills.component.html',
  styleUrls: ['./character-sheet-skills.component.css']
})
export class CharacterSheetSkillsComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly calculatorService: CalculatorService) { }

  @Input() classColor!: string;
  features!: Feature[];
  levelProficiency!: number;

  skills: string[] = ["Acrobatics", "Animal Handling", "Arcana","Deception","History","Insight",
"Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion",
"Religion", "Sleight of Hand", "Stealth", "Survival"]

  skillWithAbilities: { [skill: string]: string} = {
    "Acrobatics": "Dexterity",
    "Animal Handling": "Wisdom",
    "Arcana": "Intelligence",
    "Athletics": "Strength",
    "Deception": "Charisma",
    "History": "Intelligence",
    "Insight": "Wisdom",
    "Intimidation": "Charisma",
    "Investigation": "Intelligence",
    "Medicine": "Wisdom",
    "Nature": "Intelligence",
    "Perception": "Wisdom",
    "Performance": "Charisma",
    "Persuasion": "Charisma",
    "Religion": "Intelligence",
    "Sleight of Hand": "Dexterity",
    "Stealth": "Dexterity",
    "Survival": "Wisdom"
  }

  skillValues: { [skill: string]: number; } = {};
  skillModifiers: { [skill: string]: number; } = {};
  skillProficiency: { [skill: string]: ProficiencyTypes; } = {};
  abilityModifiers!: any;
  load: boolean = false;
  ngOnInit(): void {
    this.subscribes.push(this.store.select(i => i.state.characterAbilitiesModifiers).subscribe(sub => {
      if (sub) {
        this.abilityModifiers = sub
        this.refreshModifiers();
      }
    }))
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  @Input() set validFeatures(features: Feature[]) {
    this.features = features;
    this.readSkillValues();
    this.readSkillProficiencies();
    this.readProficiency();
    this.load = true;
    this.refreshModifiers();
  }

  readSkillValues() {
    this.skills.forEach(e => {
      const skillIndex = this.features.findIndex(i => i.Section == 'Skill' && i.Type == e && !isNaN(Number(i.Value)));
      this.skillValues[e] = skillIndex !== -1 ? Number(this.features[skillIndex].Value) : 0;
    })
  }

  readSkillProficiencies() {
    this.skills.forEach(e => {
      this.skillProficiency[e] = ProficiencyTypes.None;
    })
    this.skills.forEach(e => {
      const skillIndex = this.features.findIndex(i => i.Section == 'Skill' && i.Type == e && i.Value == 'Half-Proficient');
      if (skillIndex != -1)
        this.skillProficiency[e] = ProficiencyTypes.HalfProficiency;
    })
    this.skills.forEach(e => {
      const skillIndex = this.features.findIndex(i => i.Section == 'Skill' && i.Type == e && i.Value == 'Proficient');
      if (skillIndex != -1)
        this.skillProficiency[e] = ProficiencyTypes.Proficiency;
    })
    this.skills.forEach(e => {
      const skillIndex = this.features.findIndex(i => i.Section == 'Skill' && i.Type == e && i.Value == 'Expertise');
      if (skillIndex != -1)
        this.skillProficiency[e] = ProficiencyTypes.Expertise;
    })
  }

  readProficiency() {
    const levelIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Level' && !isNaN(Number(i.Value)))
    const level = levelIndex !== -1 ? Number(this.features[levelIndex].Value) : 1;
    const proficiencyIndex = this.features.findIndex(i => i.Section == 'Character' && i.Type == 'Proficiency' && !isNaN(Number(i.Value)))
    const proficiency = proficiencyIndex !== -1 ? Number(this.features[proficiencyIndex].Value) : 0;
    this.levelProficiency = this.calculatorService.calculateProficiency(level,proficiency);
  }

  refreshModifiers() {
    if(!this.load || !this.abilityModifiers)
      return;
    this.skills.forEach(e => {
      this.skillModifiers[e] = this.calculatorService.calculateModifier(this.skillValues[e],this.abilityModifiers[this.skillWithAbilities[e]],this.skillProficiency[e],this.levelProficiency);
    })
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

  getModifierNumberWithSign(modifier: number): string {
    const numberAbsolute = Math.abs(modifier);
    const sign : string = modifier >= 0 ? '+' : '-';
    return sign + numberAbsolute;
  }

}
