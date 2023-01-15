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
        return this.httpClient.post(url, formData, {responseType: 'text', observe: 'events'})
    }

    uploadRaceImage(File: File,Id: number){
        const formData = new FormData();
        formData.append('file',File);
        const url = environment.apiURL+"/Race/RaceUploadImage?raceId=" + Id;
        return this.httpClient.post(url, formData, {responseType: 'text', observe: 'events'})
    }

    uploadItemTypeImage(File: File,Id: number){
        const formData = new FormData();
        formData.append('file',File);
        const url = environment.apiURL+"/Item/ItemTypeUploadImage?itemTypeId=" + Id;
        return this.httpClient.post(url, formData, {responseType: 'text', observe: 'events'})
    }

    uploadClassImage(File: File,Id: number){
        const formData = new FormData();
        formData.append('file',File);
        const url = environment.apiURL+"/Class/ClassUploadImage?classId=" + Id;
        return this.httpClient.post(url, formData, {responseType: 'text', observe: 'events'})
    }

    uploadCharacterImage(File: File,Id: number){
        const formData = new FormData();
        formData.append('file',File);
        const url = environment.apiURL+"/Character/CharacterUploadImage?characterId=" + Id;
        return this.httpClient.post(url, formData, {responseType: 'text', observe: 'events'})
    }
}