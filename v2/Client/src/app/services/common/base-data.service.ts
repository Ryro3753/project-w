import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BaseDataService {

  private controller: string;
  private readonly headers = { 'Content-Type': 'application/json' };
  readonly apiTemplate: string = '/{{controller}}/{{method}}';
  readonly apiTemplateVersion: string = '/v{{version}}/{{controller}}/{{method}}';

  constructor(public readonly httpClient: HttpClient, @Inject('') controller: string
  ) {
    this.controller = controller;
  }


  private getTemplate(version: string = ''): string {
    if (version === '') {
      return this.apiTemplate;
    }

    return this.apiTemplateVersion.replace('{{version}}', version);
  }

  public getUrl(controller: string, method: string): string {

    return environment.apiURL + this.getTemplate().replace('{{controller}}', controller).replace('{{method}}', method);
  }



  private buildUrl(method: string) {
    return this.getUrl(this.controller, method);
  }

  private optionBuilder(data: any = undefined, useFormData: boolean = false, responseType: any = 'json') {
    let options: any = {
      responseType
    };

    if (data) {
      options = {
        params: new HttpParams({ fromObject: data }),
        ...options
      }
    }

    if (!useFormData) {
      options = {
        headers: new HttpHeaders(this.headers),
        ...options
      }
    }

    return options;
  }

  protected post<T = any>(method: string, data: any, responseType: any = 'json', useFormData: boolean = false): Observable<T> {
    // prepare data
    let body = data;
    if (!useFormData) {
      body = JSON.stringify(data);
    }
    const options = this.optionBuilder(undefined, useFormData, responseType);
    const url = this.buildUrl(method);
    const action = this.httpClient.post<T>(url, body, options as {});
    return action;
  }

  protected get<T = any>(method: string, data: any = undefined, responseType: any = 'json', headers?: HttpHeaders | { [header: string]: string | string[]; }): Observable<T> {
    const url = this.buildUrl(method);
    const options = {
      params: new HttpParams({ fromObject: data }),
      responseType,
      headers
    };
    const action = this.httpClient.get<T>(url, options);
    return action;
  }

  protected delete<T = any>(method: string, data: any, queryString: boolean = false): Observable<T> {
    const url = this.buildUrl(method);
    let action: Observable<T>;

    if (queryString) {
      action = this.httpClient.delete<T>(url);
    } else {
      action = this.httpClient.delete<T>(url, { params: data });
    }
    return action
  }

}
