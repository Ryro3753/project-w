import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './services/common/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Project-w';

  constructor(readonly cookieService: CookieService,
              readonly authService: AuthenticationService,
              readonly router: Router){}

  ngOnInit(){
    if(this.cookieService.get('rememberMe') == 'true'){
      this.authService.login(this.cookieService.get('username'),this.cookieService.get('password'),true);
    }
  }

  register(){
    this.router.navigateByUrl('Register');
  }
}
