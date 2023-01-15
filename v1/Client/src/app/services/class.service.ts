import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CharacterClass, ClassDetail, ClassUpdateRequest } from "../models/class.model"
import { OnlyUserId, ShareRequest } from "../models/common/common.model"
import { Race, RaceDeleteRequest, RaceDetail, RaceUpdateRequest } from "../models/races.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class ClassService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Class')
  }

  getAllClassesByUserId(userId: string): Promise<CharacterClass[]> {
    return this.get<CharacterClass[]>("GetAllClassesByUserId", { userId });
  }

  getClassDetail(classId: number): Promise<ClassDetail> {
    return this.get<ClassDetail>("GetClassDetail", { classId });
  }

  updateClass(request: ClassUpdateRequest): Promise<boolean> {
    return this.post<boolean>("UpdateClass", request);
  }

  insertClass(request: OnlyUserId): Promise<CharacterClass>{
    return this.post<CharacterClass>("InsertClass", request);
  }

  shareClass(request: ShareRequest): Promise<boolean>{
    return this.post<boolean>("ShareClass",request,true);
  }

  deleteClass(ClassId: number, UserId: string): Promise<boolean>{
    return this.delete<boolean>("DeleteClass",{ClassId:ClassId, UserId: UserId},true);
  }

  getAbilities(): Promise<string[]>{
    return this.get<string[]>("GetAbilities");
  }

}