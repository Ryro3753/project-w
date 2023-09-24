import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { AuthenticateDetail, AuthenticateRequest } from "src/app/models/user";
import { BaseDataService } from "src/app/services/common/base-data.service";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, "Authentication")
  }

  public authenticate(request: AuthenticateRequest): Observable<AuthenticateDetail> {
    return this.post<AuthenticateDetail>('Authenticate', request);
  }

}