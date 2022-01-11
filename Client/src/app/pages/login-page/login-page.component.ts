import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { login } from 'src/app/store/actions/login.action';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(readonly auth: AuthenticationService,
              readonly store: Store<{ state: State }>) { }

  ngOnInit(): void {
    //this.auth.login("asd","1234").subscribe(i => { this.store.dispatch(login(i));});
  }

}
