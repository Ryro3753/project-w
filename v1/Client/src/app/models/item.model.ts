import { Feature } from "./feature.model";

export interface ItemAttribute{
    Attribute: string;
    Value: string;
}

export interface ItemType{
    Id: number;
    Name: string;
    Description: string;
    Category: string;
    Type: string;
    Equippable: boolean;
    Tags: string;
    HasImage: boolean;
    Username: string;
}

export interface ItemTypeDetail extends ItemType{
    Features: Feature[];
    Attributes: ItemAttribute[];
}

export interface ItemTypeUpdateRequest{
    ItemTypeId: number;
    Name: string;
    Description: string;
    Category: string;
    Type: string;
    Equippable: boolean;
    Tags: string;
    Features: Feature[];
    Attributes: ItemAttribute[];
}