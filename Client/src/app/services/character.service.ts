import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CharacterBasics } from "../models/character.model"
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

}