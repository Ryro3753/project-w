import { CharacterApperance, CharacterDescription, CharacterFeature } from "./character.model";
import { Feature } from "./feature.model";

export interface CharacterAll{
    Detail: CharacterDetail;
    Apperance: CharacterApperance;
    Description: CharacterDescription;
    Features: CharacterAllFeatures;
    ClassColor:string
}


export interface CharacterDetail{
    Id: number;
    Name: string;
    Level: number;
    Class: string;
    Race: string;
    Inspiration: boolean;
    CurrentHealth: number;
    CurrentMana: number;
    CurrentTempHealth: number;
}

export interface CharacterAllFeatures{
    RaceFeatures: Feature[];
    ClassFeatures: Feature[];
    CharacterFeatures: CharacterFeature[];
}

export interface Abilities{
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Charisma: number;
    Intelligence: number;
    Wisdom: number;
}

export interface AbilitiesProficiency{
    Strength: ProficiencyTypes;
    Dexterity: ProficiencyTypes;
    Constitution: ProficiencyTypes;
    Charisma: ProficiencyTypes;
    Intelligence: ProficiencyTypes;
    Wisdom: ProficiencyTypes;
}

export enum ProficiencyTypes{
    None,
    HalfProficiency,
    Proficiency,
    Expertise
}