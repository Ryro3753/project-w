export interface Spell{
    Id: number;
    Name: string;
    Level: number;
    School: string;
    CastingTime: string;
    Ritual: boolean;
    Concentration: boolean;
    Username: string;
}


export interface SpellDetail{
    Id: number;
    Name: string;
    Description: string;
    Level: number;
    School: string;
    CastingType: string;
    CastingTime: string;
    CastingDescription: string;
    Duration: string;
    Components: string;
    ComponentsDescription: string;
    Range: string;
    Concentration: boolean;
    Ritual: boolean;
    Mana: number;
    Username: string;
}

export interface SpellUpdateRequest{
    Id: number;
    Name: string;
    Description: string;
    Level: number;
    School: string;
    CastingType: string;
    CastingTime: string;
    CastingDescription: string;
    Duration: string;
    Components: string;
    ComponentsDescription: string;
    Range: string;
    Concentration: boolean;
    Ritual: boolean;
    Mana: number;
}