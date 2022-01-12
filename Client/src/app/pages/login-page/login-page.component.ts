import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              readonly alertService: AlertService,
              readonly route: ActivatedRoute,
              readonly router: Router) { }

  username: string | undefined;
  password: string | undefined;
  rememberMe: boolean = false;

  returnURL: string | undefined;

  ngOnInit(): void {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'];
    if(this.auth.currentUser){
      this.router.navigateByUrl('/Profile')
    }
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

    this.auth.login(this.username, this.password,this.rememberMe,this.returnURL,true);
  }

  register(){
    this.router.navigateByUrl('/Register');
  }

}
