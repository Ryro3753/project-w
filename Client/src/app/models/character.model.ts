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


