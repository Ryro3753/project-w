import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UploadService{

    constructor(readonly httpClient: HttpClient) {}

    uploadProfileImage(File: File,Id: string){
        const formData = new FormData();
        formData.append('file',File);
        const url = environment.apiURL+"/User/UserUploadImage?Id=" + Id;
        return new Promise<any>((resolve, reject) => {
           this.httpClient.post(url, formData, {responseType: 'text', observe: 'events'})
           .subscribe(event => {
        }, err => {reject(err)});
        });
    }
}