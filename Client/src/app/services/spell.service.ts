import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
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

  getAllSpells(userId: string): Observable<SpellDetail[]>{
    const url = this.getUrl('Spell','GetAllSpells');
    return this.httpClient.get<SpellDetail[]>(url,{params: {userId}});
  }

  getSpell(spellId: number, userId: string): Promise<SpellDetail>{
    return this.get<SpellDetail>("GetSpell", {spellId, userId},true);
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

  getSpellLevels(){
    return [
      {id: 0, value:'Cantrip'},
      {id: 1, value:'1st Level'}, 
      {id: 2, value:'2nd Level'},
      {id: 3, value:'3rd Level'}, 
      {id: 4, value:'4th Level'}, 
      {id: 5, value:'5th Level'}, 
      {id: 6, value:'6th Level'},
      {id: 7, value:'7th Level'}, 
      {id: 8, value:'8th Level'}, 
      {id: 9, value:'9th Level'}, 
      {id: 10, value:'10th Level'}];
  }

  getSpellComponents(): string[]{
    return ['V','S','M'];
  }

  getSpellSchools(): string[] {
    return [
      'Abjuration',
      'Transmutation',
      'Conjuration',
      'Divination',
      'Enchantment',
      'Evocation',
      'Illusion',
      'Necromancy'
    ]
  }

  getSpellRanges(): string[] {
    return [
      'Touch',
      'Sight',
      'Self',
      'Unlimited'
    ]
  }

  getSpellCastingType(): string[] {
    return [
      'Action',
      'Bonus Action',
      'Reaction',
      'Special'
    ]
  }
}