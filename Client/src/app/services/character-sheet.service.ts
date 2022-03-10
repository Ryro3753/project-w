import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { CharacterAll, UpdateCharacterDetailRequest } from "../models/character-sheet.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class CharacterSheetService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'CharacterSheet')
  }

  getAll(characterId: number): Observable<CharacterAll>{
    const url = this.getUrl('CharacterSheet','GetAll');
    return this.httpClient.get<CharacterAll>(url,{params: {characterId}});
  }

  updateCharacterDetails(request: UpdateCharacterDetailRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterDetails",request);
  }
}