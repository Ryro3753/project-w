import { Component } from '@angular/core';
import { AuthenticationService } from './services/common/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Project-w';

  constructor(readonly authen: AuthenticationService){
  }

  ngOnInit(){
  }
}
