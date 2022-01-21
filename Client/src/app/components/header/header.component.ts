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
export class HeaderComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly route: Router) { }

  diceIconPath = environment.apiURL + '/images/miscimages/dice.svg';
  currentUser: User | undefined;

  ngOnInit(): void {
    this.refreshUserInformation();
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }


  refreshUserInformation() {
    const sub = this.store.select('state').subscribe(i => this.currentUser = i.user);
    this.subscribes.push(sub);
  }

  login(event: any) {
    if (event.which == 2) {
      if (!this.currentUser)
        window.open('/Login', '_blank');
      else
        window.open('/Profile', '_blank');
    }
    else if (event.which == 1) {
      if (!this.currentUser)
        this.route.navigateByUrl('/Login');
      else
        this.route.navigateByUrl('/Profile');
    }
  }


  home(event: any) {
    if (event.which == 2) {
      window.open('/', '_blank');
    }
    else if (event.which == 1) {
      this.route.navigateByUrl('/');
    }
  }

  races(event: any) {
    if (event.which == 2) {
      window.open('/Races', '_blank');
    }
    else if (event.which == 1) {
      this.route.navigateByUrl('/Races');
    }
  }

  classes(event: any) {
    if (event.which == 2) {
      window.open('/Classes', '_blank');
    }
    else if (event.which == 1) {
      this.route.navigateByUrl('/Classes');
    }
  }

  traits(event: any) {
    if (event.which == 2) {
      window.open('/Traits', '_blank');
    }
    else if (event.which == 1) {
      this.route.navigateByUrl('/Traits');
    }
  }

  items(event: any) {
    if (event.which == 2) {
      window.open('/Items', '_blank');
    }
    else if (event.which == 1) {
      this.route.navigateByUrl('/Items');
    }
  }

  spells(event: any) {
    if (event.which == 2) {
      window.open('/Spells', '_blank');
    }
    else if (event.which == 1) {
      this.route.navigateByUrl('/Spells');
    }
  }

}
