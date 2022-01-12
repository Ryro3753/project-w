import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterRequest, User } from 'src/app/models/common/user.model';
import { BaseDataService } from './base-data.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducer/reducer';
import { login, logout } from 'src/app/store/actions/login.action';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseDataService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: User | undefined;

    constructor(override readonly httpClient: HttpClient,
                readonly alertService: AlertService,
                readonly store: Store<{ state: State }>,
                readonly cookieService: CookieService,
                readonly router: Router,) {
        super(httpClient, 'User')
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, rememberMe: boolean, returnURL?:string, alertOn: boolean = false) {
        const loginRequest = this.post<User>(`authenticate`, { username, password });
        loginRequest.then(user => {
            this.saveToLocalStorage(user);
            if(alertOn){
                this.alertService.alert({alertInfo:{message:'Successfully logged in',type:'success',timeout:5000}})
                this.afterLoggedIn(username,password,rememberMe,returnURL)
            }
        }).catch(error => {
            if(!(error.error instanceof Array)){
                this.alertService.alert({alertInfo:{message:error.error,type:'danger',timeout:5000}});
                this.logout();
            }
        })
    }

    saveToLocalStorage(user: User){
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(user.Token));
        this.store.dispatch(login(user));
        this.currentUser = user;
        this.currentUserSubject.next(user);
    }

    afterLoggedIn(username: string, password: string, rememberMe: boolean, returnURL?:string){
        if(rememberMe){
            this.cookieService.set('username',username);
            this.cookieService.set('password',password);
            this.cookieService.set('rememberMe','true');
        }
        if(returnURL && returnURL !== null){
            setTimeout(() => this.router.navigateByUrl('/Profile'),0);
            
        }
        else{
            setTimeout(() => this.router.navigateByUrl(''),0);
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.cookieService.delete('username');
        this.cookieService.delete('password');
        this.cookieService.delete('rememberMe');
        this.store.dispatch(logout());
    }

    register(request: RegisterRequest) {
        const registerRequest = this.post<User>('Register',request);
        registerRequest.then(user => {
            this.saveToLocalStorage(user);
            this.alertService.alert({alertInfo:{message:'Successfully registered',type:'success',timeout:5000}})
            this.afterLoggedIn(request.Username,request.Password,true)
        }).catch(error => {
            if(!(error.error instanceof Array)){
                this.alertService.alert({alertInfo:{message:error.error,type:'danger',timeout:5000}});
            }
        })

    }
    
}