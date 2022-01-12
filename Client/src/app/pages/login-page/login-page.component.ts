import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(readonly auth: AuthenticationService,
              readonly store: Store<{ state: State }>,
              readonly alertService: AlertService) { }

  username: string | undefined;
  password: string | undefined;
  rememberMe: boolean = false;

  ngOnInit(): void {
  }

  login(){
    if(!this.username || this.username === '' ){
      this.alertService.alert({alertInfo:{message:'Please make sure to enter Username',type:'danger',timeout:5000}});
      return;
    }
    if(!this.password || this.password === ''){
      this.alertService.alert({alertInfo:{message:'Please make sure to enter Password',type:'danger',timeout:5000}});
      return;
    }

    this.auth.login(this.username, this.password,this.rememberMe);
  }

}
