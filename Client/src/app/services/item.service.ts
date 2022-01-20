import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { OnlyUserId, ShareRequest } from "../models/common/common.model"
import { ItemType, ItemTypeDetail, ItemTypeUpdateRequest } from "../models/item.model"
import { Trait, TraitUpdateRequest, TraitWithFeature } from "../models/traits.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class ItemService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Item')
  }

  getAllTraitsByUserId(userId: string): Promise<ItemType[]>{
    return this.get<ItemType[]>("GetItemsByUserId", {userId});
  }

  getItemType(itemTypeId: number, userId: string): Promise<ItemTypeDetail>{
    return this.get<ItemTypeDetail>("GetItemType", {itemTypeId, userId}, true);
  }

  insertItemType(request: OnlyUserId): Promise<ItemType>{
    return this.post<ItemType>("InsertItemType", request);
  }

  updateItemType(request: ItemTypeUpdateRequest): Promise<ItemTypeDetail>{
    return this.post<ItemTypeDetail>("UpdateItemType", request);
  }

  shareItemType(request: ShareRequest): Promise<boolean>{
    return this.post<boolean>("ShareItemType",request,true);
  }

  deleteItemType(itemTypeId: number, UserId: string): Promise<boolean>{
    return this.delete<boolean>("DeleteItemType",{ItemTypeId:itemTypeId, UserId: UserId},true);
  }

  getItemAttributes(): Promise<string[]>{
    return this.get<string[]>("GetItemAttributes");
  }
}