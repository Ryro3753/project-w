import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/common/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(readonly alertService: AlertService,
              readonly authService: AuthenticationService,
              readonly router: Router) { }

  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.authService.logout();
  }

  register(){
    if(!this.email || this.email === '' ){
      this.alertService.alert({alertInfo:{message:'Please make sure to enter Email',type:'danger',timeout:5000}});
      return;
    }
    if(!this.email.match(this.regexEmail)){
      this.alertService.alert({alertInfo:{message:'Please insert a valid Email address',type:'danger',timeout:5000}});
      return;
    }
    if(!this.username || this.username === '' ){
      this.alertService.alert({alertInfo:{message:'Please make sure to enter Username',type:'danger',timeout:5000}});
      return;
    }
    if(!this.password || this.password === ''){
      this.alertService.alert({alertInfo:{message:'Please make sure to enter Password',type:'danger',timeout:5000}});
      return;
    }
    if(!this.confirmPassword || this.confirmPassword === '' || this.confirmPassword !== this.password){
      this.alertService.alert({alertInfo:{message:'Please make sure passwords confirm each other',type:'danger',timeout:5000}});
      return;
    }

    this.authService.register({
      Email: this.email,
      Password: this.password,
      Username: this.username
    });
  }
}
