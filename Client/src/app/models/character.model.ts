import { Feature } from "./feature.model";

export interface CharacterBasics{
    Id: number;
    Name: string;
    ClassId: number;
    RaceId: number;
    Username: string;
}

export interface CharacterCreationRequest{
    Name: string;
    ClassId: number;
    RaceId: number;
    UserId: string;
}

export interface UpdateCharacterRequest{
    CharacterId:number;
    Name: string;
    ClassId: number;
    RaceId: number;
}

export interface CharacterApperance{
    CharacterId: number;
    Gender: string;
    Eyes: string;
    Weight: string;
    Height: string;
    Hair: string;
    Skin: string;
    Age: string;
    Note: string;
    HasImage: boolean;
}

export interface UpdateCharacterApperanceRequest{
    CharacterId: number;
    Gender: string;
    Eyes: string;
    Weight: string;
    Height: string;
    Hair: string;
    Skin: string;
    Age: string;
    Note: string;
}

export interface CharacterDescription{
    CharacterId: number;
    Background: string; 
    Alignment: string; 
    Faith: string; 
    PersonalityTraits: string;
    Ideals: string;
    Bonds: string;
    Flaws: string;
    Organization: string; 
    Allies: string;
    Enemies: string;
    Backstory: string;
    Note: string;
}

export interface CharacterFeature{
    Id: number;
    CharacterId: number;
    Feature: Feature;
    Note: string;
}

export interface UpdateCharacterAbilitiesRequest{
    CharacterAbilities: CharacterFeature[];
}

export interface InsertCharacterFeatureRequest{
    CharacterId: number;
    Feature: Feature;
    Note: string;
}
