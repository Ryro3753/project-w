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