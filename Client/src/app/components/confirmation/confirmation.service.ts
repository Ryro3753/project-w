import { Injectable } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { INgxSmartModalOptions } from 'ngx-smart-modal/src/config/ngx-smart-modal.config';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from './confirmation.component';


@Injectable({
    providedIn: "root"
})
export class ConfirmationService {

  constructor(readonly simpleModalService:SimpleModalService) { }

  public confirm(title: string, message: string): Observable<boolean> {
    return this.simpleModalService.addModal(ConfirmationComponent, {
        title: title,
        message: message
      })
  }

}
