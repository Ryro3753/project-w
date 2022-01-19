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

  getItemType(itemTypeId: number): Promise<ItemTypeDetail>{
    return this.get<ItemTypeDetail>("GetItemType", {itemTypeId});
  }

  insertItemType(request: OnlyUserId): Promise<ItemTypeDetail>{
    return this.post<ItemTypeDetail>("InsertItemType", request);
  }

  updateItemType(request: ItemTypeUpdateRequest): Promise<ItemTypeDetail>{
    return this.post<ItemTypeDetail>("UpdateItemType", request);
  }

  shareItemType(request: ShareRequest): Promise<boolean>{
    return this.post<boolean>("ShareItemType",request,true);
  }

  deleteItemType(ItemTypeId: number, UserId: string): Promise<boolean>{
    return this.delete<boolean>("DeleteItemType",{ItemTypeId:ItemTypeId, UserId: UserId},true);
  }
}