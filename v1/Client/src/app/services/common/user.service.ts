import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { User } from "src/app/models/common/user.model";
import { BaseDataService } from "./base-data.service"



@Injectable({
    providedIn: "root"
})
export class UserService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'User')
  }

  getUser(Id: string): Promise<User>{
      return this.get<User>('GetUser',{Id});
  }

}