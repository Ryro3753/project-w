import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Race, RaceDetail } from "../models/races.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class RaceService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Race')
  }

  getAllRacesByUserId(userId: string): Promise<Race[]> {
    return this.get<Race[]>("GetAllRacesByUserId", { userId });
  }

  getRaceDetail(raceId: number): Promise<RaceDetail[]> {
    return this.get<RaceDetail[]>("GetRaceDetail", { raceId });
  }

}