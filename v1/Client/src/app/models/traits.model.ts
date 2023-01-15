import { Feature } from "./feature.model";

export interface Trait {
    Id: number;
    Name: string;
    Description: string;
    Username: string;
}

export interface TraitWithFeature extends Trait {
    Features: Feature[];
}

export interface TraitUpdateRequest{
    TraitId: number;
    Name: string;
    Description: string;
    Features: Feature[];
}
