import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { State } from 'src/app/store/reducer/reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(readonly store: Store<{ state: State }>,
              readonly route: Router) { }

  diceIconPath = environment.apiURL + '/images/miscimages/dice.svg';
  currentUser : User | undefined;

  ngOnInit(): void {
    this.refreshUserInformation();
  }

  login(){
    this.route.navigateByUrl('/Login');
  }

  refreshUserInformation(){
    this.store.select('state').subscribe(i => this.currentUser = i.user);
  }

  home(){
    this.route.navigateByUrl('');
  }

}
