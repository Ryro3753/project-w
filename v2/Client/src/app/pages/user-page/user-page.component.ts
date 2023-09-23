import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseClass } from 'src/app/services/common/base.class';
import { CommonStoreState } from 'src/app/store/reducers/common-reducer';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent extends BaseClass {
  constructor(readonly store: Store<{commonStoreState: CommonStoreState}>) {
    super();
  }
}