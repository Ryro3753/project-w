import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { AuthenticateRequest } from 'src/app/models/user/user.interface';
import { BaseClass } from 'src/app/services/common/base.class';
import { authUser } from 'src/app/store/actions/user.action';
import { CommonStoreState } from 'src/app/store/reducers/common-reducer';
import { selectAuthDetail } from 'src/app/store/selectors/user.selector';
import { fabric } from 'fabric';
import { FabricJsService } from 'src/app/services/board/fabric-js.service';
import { BoardGridType } from 'src/app/enums/board-grid-type.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends BaseClass implements OnInit {

  constructor(readonly store: Store<{commonStoreState: CommonStoreState}>,
    readonly router: Router,
    readonly formBuilder: FormBuilder,
    readonly fabricService: FabricJsService){
      super()
    }

    protected _canvas?: fabric.Canvas;
    protected _mouseUp!: (evt: fabric.IEvent) => void;

    public username !: string;
    public password !: string;

    public form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  ngOnInit(): void {
    this.store.select(selectAuthDetail)
    .pipe(takeUntil(this._destroy$))
    .subscribe(authDetail => {
      console.log(authDetail);
      if(authDetail && !this.form.touched)
        this.router.navigateByUrl('User');
      else if(authDetail && this.form.touched){
        //this.router.navigateByUrl('User');
        localStorage.setItem('token', authDetail.token);
        localStorage.setItem('userDetails', JSON.stringify(authDetail));
      }
    })
    const t = this;
    fabric.Image.fromURL('https://indirimlerce.com/wp-content/uploads/2021/05/Twitch-Eren-ErenAktan-Aktan-Kimdir-Kac-Yasinda-Ne-Is-Yapiyor.jpg', (img) => {
      const z = (img.height??1) * .5;
      console.log(z);
      img.set({
        hasControls: false,
        hasBorders: false,
        left: 0,
        top: 0,
        clipPath: new fabric.Circle({
          radius: z,
          originX: 'center',
          originY: 'center',
      }),
      });
      img.scaleToHeight(50);
      img.scaleToWidth(50);
      console.log(img.width)
      console.log(img.height)
      this._canvas?.add(img);
  });
  this.fabricService.initCanvas();
  }

  tiny() {

  this.fabricService.showGrid(BoardGridType.Tiny);
}
  medium() {
  this.fabricService.showGrid(BoardGridType.Medium);
    
  }
  large() {
  this.fabricService.showGrid(BoardGridType.Large);
    
  }
  clear() {
  this.fabricService.clearLines();    
  }

  signIn(): void {
    if(this.form.valid){
      const requestModel: AuthenticateRequest = {
        password: this.password,
        usernameOrEmail: this.username
      }
      this.store.dispatch(authUser({request: requestModel}));
    }
    else {
      this.form.markAllAsTouched();
    }
  }
}
