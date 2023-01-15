import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Character, CharacterApperance, CharacterBasics, CharacterCreationRequest, CharacterDescription, CharacterFeature, InsertCharacterFeatureRequest, UpdateCharacterAbilitiesRequest, UpdateCharacterApperanceRequest, UpdateCharacterRequest } from "../models/character.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class CharacterService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Character')
  }

  getCharacterCreationBasics(characterId: number, userId: string): Promise<CharacterBasics>{
    return this.get<CharacterBasics>("GetCharacterCreationBasics",{characterId, userId});
  }

  createCharacter(request: CharacterCreationRequest): Promise<CharacterBasics>{
    return this.post<CharacterBasics>("CreateCharacter",request);
  }

  updateCharacter(request: UpdateCharacterRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacter",request);
  }

  getCharacterApperance(characterId: number): Promise<CharacterApperance>{
    return this.get<CharacterApperance>("GetCharacterApperance",{characterId});
  }

  updateCharacterApperance(request: UpdateCharacterApperanceRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterApperance",request);
  }

  getCharacterDescription(characterId: number): Promise<CharacterDescription>{
    return this.get<CharacterDescription>("GetCharacterDescription",{characterId});
  }

  updateCharacterDescription(request: CharacterDescription): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterDescription",request);
  }

  getCharacterAbilities(characterId: number): Promise<CharacterFeature[]>{
    return this.get<CharacterFeature[]>("GetCharacterAbilities",{characterId})
  }

  updateCharacterAbilities(request: UpdateCharacterAbilitiesRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterAbilities",request);
  }

  insertCharacterFeature(request: InsertCharacterFeatureRequest): Promise<CharacterFeature>{
    return this.post<CharacterFeature>("InsertCharacterFeature",request);
  }

  updateCharacterFeature(request: CharacterFeature): Promise<CharacterFeature>{
    return this.post<CharacterFeature>("UpdateCharacterFeature",request);
  }

  getCharacterFeatures(characterId: number, note: string): Promise<CharacterFeature[]>{
    return this.get<CharacterFeature[]>("GetCharacterFeatures",{characterId, note})
  }

  deleteCharacterFeatures(featureId: number): Promise<boolean>{
    return this.delete<boolean>("DeleteCharacterFeatures", {featureId});
  }

  getCharacters(userId: string): Promise<Character[]>{
    return this.get<Character[]>("GetCharacters",{userId})
  }

  deleteCharacter(characterId: number): Promise<boolean>{
    return this.delete<boolean>("DeleteCharacter", {characterId});
  }
}