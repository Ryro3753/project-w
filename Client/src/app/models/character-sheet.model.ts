import { CharacterApperance, CharacterDescription, CharacterFeature } from "./character.model";
import { Feature } from "./feature.model";

export interface CharacterAll{
    Detail: CharacterDetail;
    Apperance: CharacterApperance;
    Description: CharacterDescription;
    Features: CharacterAllFeatures[];
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
    ClassFeature: Feature[];
    CharacterFeatures: CharacterFeature[];
}

