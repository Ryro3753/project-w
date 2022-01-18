import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService } from './components/confirmation/confirmation.service';
import { FeaturesClosePopupEvent, FeaturesPopupEvent } from './events/features.popup.event';
import { Feature } from './models/feature.model';
import { AuthenticationService } from './services/common/authentication.service';
import { MessageBusService } from './services/common/messagebus.service';
import { FeatureService } from './services/feature.service';

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
              readonly f: FeatureService){
              }

  async ngOnInit(){
    this.loginWithCookies();
    await this.f.readValidFeatures([]);
  }

  loginWithCookies(){
    if(this.cookieService.get('rememberMe') == 'true'){
      this.authService.login(this.cookieService.get('username'),this.cookieService.get('password'),true);
    }
    else {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
  }

}
