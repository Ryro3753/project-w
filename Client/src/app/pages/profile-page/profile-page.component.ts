import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { User } from 'src/app/models/common/user.model';
import { State } from 'src/app/store/reducer/reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  
  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,) { }

  currentUser : User | undefined;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  profileImageBasePath = this.apiURL + '/images/miscimages/';

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(i => this.currentUser = i.user);
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }
}
