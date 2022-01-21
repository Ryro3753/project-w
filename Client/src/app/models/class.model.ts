import { Feature } from "./feature.model";

export interface CharacterClass {
    Id: number;
    Name: string;
    Color: string;
    HasImage: boolean;
    Username: string
}

export interface ClassDetail{
    Id: number;
    Name: string;
    Description: string;
    Color: string;
    HitDie: string;
    PrimaryAbility: string;
    Saves: string;
    Features: Feature[];
    HasImage: boolean;
    Username: string;
}

export interface ClassUpdateRequest{
    Id: number;
    Name: string;
    Description: string;
    Color: string;
    HitDie: string;
    PrimaryAbility: string;
    Saves: string;
    Features: Feature[];
}