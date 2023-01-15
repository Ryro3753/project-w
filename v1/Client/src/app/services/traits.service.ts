import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { OnlyUserId, ShareRequest } from "../models/common/common.model"
import { Trait, TraitUpdateRequest, TraitWithFeature } from "../models/traits.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class TraitsService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Trait')
  }

  getAllTraitsByUserId(userId: string): Promise<Trait[]>{
    return this.get<Trait[]>("GetAllTraitsByUserId", {userId});
  }

  getTrait(traitId: number): Promise<TraitWithFeature>{
    return this.get<TraitWithFeature>("GetTrait", {traitId});
  }

  insertTrait(request: OnlyUserId): Promise<TraitWithFeature>{
    return this.post<TraitWithFeature>("InsertTrait", request);
  }

  updateTrait(request: TraitUpdateRequest): Promise<TraitWithFeature>{
    return this.post<TraitWithFeature>("UpdateTrait", request);
  }

  shareTrait(request: ShareRequest): Promise<boolean>{
    return this.post<boolean>("ShareTrait",request,true);
  }

  deleteTrait(TraitId: number, UserId: string): Promise<boolean>{
    return this.delete<boolean>("DeleteTrait",{TraitId:TraitId, UserId: UserId},true);
  }

  getTraitsWithDetails(userId: string): Observable<TraitWithFeature[]>{
    const url = this.getUrl('Trait','GetTraitsWithDetails');
    return this.httpClient.get<TraitWithFeature[]>(url,{params: {userId}});
  }
}