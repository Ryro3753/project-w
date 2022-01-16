import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { User } from 'src/app/models/common/user.model';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { UploadService } from 'src/app/services/common/upload.service';
import { UserService } from 'src/app/services/common/user.service';
import { State } from 'src/app/store/reducer/reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  
  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
              readonly uploadService: UploadService,
              readonly userService: UserService,
              readonly router: Router,
              readonly authService: AuthenticationService) { }

  currentUser : User | undefined;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  profileImageBasePath = this.apiURL + '/images/profileImages/';

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(async i => {
      if(i.user)
        this.currentUser = await this.userService.getUser(i.user.Id)
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }
  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  addImage(e: any){
    if(!this.currentUser)
      return;
    this.uploadService.uploadProfileImage(e.target.files[0],this.currentUser.Id).toPromise().then(i => {
      if(this.currentUser)
        this.currentUser.HasImage = true;
    });
  }
}
