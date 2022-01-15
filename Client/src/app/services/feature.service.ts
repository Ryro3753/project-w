import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Race} from "../models/races.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class FeatureService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Feature')
  }

  getSections(): Promise<string[]> {
    return this.get<string[]>("GetSections");
  }

  getTypes(){
    return this.get("GetTypes");
  }

  getTypesForRequirements(){
    return this.get("GetTypesForRequirements");
  }
}