import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CharacterBasics, CharacterCreationRequest, UpdateCharacterRequest } from "../models/character.model"
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

}