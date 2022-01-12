import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs/internal/types';
import { User } from 'src/app/models/common/user.model';
import { State } from 'src/app/store/reducer/reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
              readonly route: Router) { }

  diceIconPath = environment.apiURL + '/images/miscimages/dice.svg';
  currentUser : User | undefined;

  ngOnInit(): void {
    this.refreshUserInformation();
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  login(){
    if(!this.currentUser)
      this.route.navigateByUrl('/Login');
    else
      this.route.navigateByUrl('/Profile');
  }

  refreshUserInformation(){
    const sub = this.store.select('state').subscribe(i => this.currentUser = i.user);
    this.subscribes.push(sub);
  }

  home(){
    this.route.navigateByUrl('');
  }

}
