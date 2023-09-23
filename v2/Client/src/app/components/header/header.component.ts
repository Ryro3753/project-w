import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticateDetail } from 'src/app/models/user/user.interface';
import { authUser } from 'src/app/store/actions/user.action';
import { CommonStoreState } from 'src/app/store/reducers/common-reducer';
import { selectAuthDetail } from 'src/app/store/selectors/user.selector';
import { URLLogin, URLUserDetail } from 'src/globals/constants';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user !: AuthenticateDetail;

  constructor(readonly store: Store<{commonStoreState: CommonStoreState}>,
    readonly router: Router){
    /*store.dispatch(authUser({request:{
      usernameOrEmail:'u',
      password:'p'
    }}));*/
    store.select(selectAuthDetail).subscribe(user => {
      if(user)
        this.user = user;
    });
  }

  userClicked(){
    if(this.user)
      this.router.navigateByUrl(URLUserDetail)
    else
      this.router.navigateByUrl(URLLogin)
  }
}
