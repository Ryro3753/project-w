import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from './events/features.popup.event';
import { Feature } from './models/feature.model';
import { AuthenticationService } from './services/common/authentication.service';
import { MessageBusService } from './services/common/messagebus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Project-w';

  www: Feature[] = [];

  constructor(readonly cookieService: CookieService,
              readonly authService: AuthenticationService,
              readonly router: Router,
              readonly bus:MessageBusService){
                this.bus.of(FeaturesClosePopupEvent).subscribe(this.featuresPopupEvent.bind(this));
              }

  ngOnInit(){
    this.loginWithCookies();
  }

  loginWithCookies(){
    if(this.cookieService.get('rememberMe') == 'true'){
      this.authService.login(this.cookieService.get('username'),this.cookieService.get('password'),true);
    }
  }

  asd(){
    this.bus.publish(new FeaturesPopupEvent("main",this.www));
  }

  featuresPopupEvent(asd:FeaturesClosePopupEvent){
    console.log(this.www);

  }
}
