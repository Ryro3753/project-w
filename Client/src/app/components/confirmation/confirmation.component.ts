import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel {
  title!: string;
  message!: string;
  constructor() {
    super();
  }
  confirm() {
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }

}
export interface ConfirmModel {
  title: string;
  message: string;
}