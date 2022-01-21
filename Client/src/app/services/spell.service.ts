import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { OnlyUserId, ShareRequest } from "../models/common/common.model"
import { Spell, SpellDetail, SpellUpdateRequest } from "../models/spell.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class SpellService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Spell')
  }

  getAllSpellsByUserId(userId: string): Promise<Spell[]>{
    return this.get<Spell[]>("GetAllSpellsByUserId", {userId});
  }

  getSpell(spellId: number, userId: string): Promise<SpellDetail>{
    return this.get<SpellDetail>("GetSpell", {spellId, userId});
  }

  insertSpell(request: OnlyUserId): Promise<Spell>{
    return this.post<Spell>("InsertSpell", request);
  }

  updateSpell(request: SpellUpdateRequest): Promise<SpellDetail>{
    return this.post<SpellDetail>("UpdateSpell", request);
  }

  shareSpell(request: ShareRequest): Promise<boolean>{
    return this.post<boolean>("ShareSpell",request,true);
  }

  deleteSpell(SpellId: number, UserId: string): Promise<boolean>{
    return this.delete<boolean>("DeleteSpell",{SpellId:SpellId, UserId: UserId},true);
  }
}