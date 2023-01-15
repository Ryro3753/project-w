import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { Alert } from 'src/app/models/common/alert.model';

@Injectable({
    providedIn: "root"
})
export class AlertService {

    private subject = new Subject<Alert>();
    private id = 0;

    constructor() { }

    getObservable(): Observable<Alert> {
        return this.subject.asObservable();
    }
    alert(alert: Alert) {
        if(!alert.alertInfo.timeout)
            alert.alertInfo.timeout = 3000;
        this.subject.next(new Alert({ 
            id: this.id++, 
            message: alert.alertInfo.message, 
            timeout: alert.alertInfo.timeout, 
            type: alert.alertInfo.type 
        }));
    }

}