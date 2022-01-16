import { Feature } from "./feature.model";

export interface Race{
    Id: number;
    Name: string;
    HasImage: boolean;
    Username: string;
}

export interface RaceDetail{
    RaceId: number;
    Description: string;
    Speed: number;
    Size: string;
    Features: Feature[];
}

export interface RaceUpdateRequest{
    RaceId: number;
    Name: string;
    Speed: number;
    Size: string;
    Description: string;
    Features: Feature[];
}
