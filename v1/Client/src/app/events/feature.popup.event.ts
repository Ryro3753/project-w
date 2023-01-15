import { Feature } from "../models/feature.model";

export class FeaturePopupEvent{
    constructor(public from: string, public id: number, public feature: Feature){
    }
}

export class FeatureClosePopupEvent{
    constructor(public to: string, public id: number, public feature: Feature){
    }
}