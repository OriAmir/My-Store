import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../objectModels/user.model';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import * as JWT from 'jwt-decode';

declare const FB: any; //FACEBOOK Object frmo JS library

@Injectable()

export class AuthService {
  token: string;
  isLogIn:boolean = false;
  constructor(private router: Router,private httpClient:HttpClient,private cookieService: CookieService) {
    
      FB.init({
        appId      : "123336505095182",
        status     : false, // the SDK will attempt to get info about the current user immediately after init
        cookie     : false,  // enable cookies to allow the server to access
        // the session
        xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
        version    : 'v2.8' // use graph api version 2.5
      });
  }


  fbGetLoginstatusAndLogOut()
  {

      FB.getLoginStatus(        
        response => {
            // the user is logged in and has authenticated your app
            if (response.status === 'connected') {
              // var uid = response.authResponse.userID;
              // var accessToken = response.authResponse.accessToken;

              FB.logout(function(response){
                console.log("user logout success");
              });
            } else if (response.status === 'not_authorized') {  // the user is logged in to Facebook, but has not authenticated your app

              FB.logout(function(response){
                console.log("user logout success");
              });
              } else {
              // the user isn't logged in to Facebook.
            }
      }) 
    
  }
  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {          
          return this.httpClient.post(`http://localhost:3000/user/auth/facebook`, {access_token: result.authResponse.accessToken})
              .toPromise()
              .then(response => {
                console.log("test!test!test");
                resolve(response);
              })
              .catch((error) => reject(error));
        } else {
          reject('Login with facebook wrong');
        }
      }, {scope: 'public_profile,email'})
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.httpClient.get(`http://localhost:3000/api/v1/auth/me`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }


  userLogOutEvent = new EventEmitter<any>();
  userLogInEvent = new EventEmitter<boolean>();
  
  logOutUser()
  {
      this.cookieService.delete("token",null);
      this.router.navigateByUrl('/');
      this.userLogOutEvent.emit();

      //check if this is facebook user -logout his account
      this.fbGetLoginstatusAndLogOut();
      
  }
  signupUser(user: User) {
    const body = JSON.stringify(user);
    return this.httpClient.post('http://localhost:3000/user/signup', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        // .map((response: Response) => response.json())
        .catch((error: Response) =>  Observable.throw(error)  
      );
        
  }

  signinUser(user: User) {

    const body = JSON.stringify(user);
    return this.httpClient.post('http://localhost:3000/user/signin', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        // .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error)); 
  }

  isExistCookie()
  {
    var token=this.cookieService.get('token');
    if(token== "" || token==null)
        return false;

      return true;
  }

  getDisplayName()
  {
    var token=this.cookieService.get('token');
    if(!token || token==null)
      return null;
      
    let decodedToken= JWT(token);
    return decodedToken.user.firstName;
    
  }
  getUserId()
  {
    var token=this.cookieService.get('token');
    let decodedToken= JWT(token);
    return decodedToken.user.id;
    
  }
  isLoggedIn() {

      var token=this.cookieService.get('token');
      const body = JSON.stringify({'token':token});
      return this.httpClient.post('http://localhost:3000/user/isAuthorized', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
          //  .map((response: Response) => this.isLogIn=true)
          .catch((error: Response) => Observable.throw(error)); 
  }

  isLoggedInFaceBook() {

    var token=this.cookieService.get('token');
    const body = JSON.stringify({'access_token':token});
    return this.httpClient.post('http://localhost:3000/user/auth/facebook', body)
        //  .map((response: Response) => this.isLogIn=true)
        .catch((error: Response) => Observable.throw(error)); 
  }
    

  isAuthenticated(): boolean
  {
    console.log("inside...");
    console.log("ISLOGIN:" +this.isLogIn);
    
      // this.isLoggedIn().subscribe()
      // {
      //   data => {
      //     console.log("data: ");
      //     console.log(data);

      //     return data.val;}
      // }

     return this.isLogIn;

  }


}
