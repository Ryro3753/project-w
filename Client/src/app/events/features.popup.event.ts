import { Feature } from "../models/feature.model";

export class FeaturesPopupEvent{
    constructor(public from: string, public features: Feature[]){
    }
}

export class FeaturesClosePopupEvent{
    constructor(public to: string, public features: Feature[]){
    }
}