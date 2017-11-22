import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../objectModels/user.model';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import * as JWT from 'jwt-decode';
import { MailService } from '../shared/mail.service';

declare const FB: any; //FACEBOOK Object frmo JS library
const signInAddress='http://localhost:3000/user/signin';
const signUpAddress='http://localhost:3000/user/signup';
const facebookAuthAdress='http://localhost:3000/user/auth/facebook';
const userAuthorizedAddress='http://localhost:3000/user/isAuthorized';
const CONFIRMATION_REG_LINK_URL = "http://localhost:3000/confirm-registration/";
const condirmKeyAddress='http://localhost:3000/user/confirmkey';
@Injectable()

export class AuthService {
  token: string;
  isLogIn:boolean = false;

  userLogOutEvent = new EventEmitter<any>();
  userLogInEvent = new EventEmitter<boolean>();
  

  constructor(private router: Router,
    private httpClient:HttpClient,
    private cookieService: CookieService,
    private mailService: MailService) {
    
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
          return this.httpClient.post(facebookAuthAdress, {access_token: result.authResponse.accessToken})
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

  // getCurrentUser() {
  //   return new Promise((resolve, reject) => {
  //     return this.httpClient.get(`http://localhost:3000/api/v1/auth/me`).toPromise().then(response => {
  //       resolve(response.json());
  //     }).catch(() => reject());
  //   });
  // }


 
  logOutUser()
  {
      this.cookieService.delete("token",null);
      this.router.navigateByUrl('/');
      this.userLogOutEvent.emit();

      //check if this is facebook user -logout his account
      this.fbGetLoginstatusAndLogOut();
      
  }


  createRandomKey()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
  }

  signupUser(user: User) {


    return new  Promise( (resolve,reject)=>{
     
      user.randomKey=this.createRandomKey();
      const body = JSON.stringify(user);
      
      this.httpClient.post(signUpAddress, body, {headers: new HttpHeaders().set('Content-Type','application/json')})
          .toPromise()
          .then(
            
            (res) => {

                    var mail_content = this.mailService.createRegMail(user.firstName, user.lastName,CONFIRMATION_REG_LINK_URL+user.randomKey);
                    const body = { email: user.email,
                                    object_mail: 'Registration',
                                    message: mail_content,
                                    text_option: 'html' };
                                                  
                    //send a confirm email to the new user
                    this.mailService.sendMail(JSON.stringify(body))
                        .subscribe(
            
                            data => {
                              console.log("ok send mail");   
                              data.user=res;                           
                              resolve(data);
                            },
                            error => {console.log("errro test"); console.log(error);reject(error);}
                            
                            );
                        
      },

      error => reject(error)        
    ) 
      

    });      
    
        
  }

  confirmRandomKeyUser(randomKey:string)
  {
    const body = JSON.stringify({randomKey:randomKey});
    return this.httpClient.post(condirmKeyAddress, body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        // .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error)); 

  }

  signinUser(user) {

    const body = JSON.stringify(user);
    return this.httpClient.post(signInAddress, body, {headers: new HttpHeaders().set('Content-Type','application/json')})
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
    console.log("DECODED TOKEN:");
    console.log(decodedToken)
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
      return this.httpClient.post(userAuthorizedAddress, body, {headers: new HttpHeaders().set('Content-Type','application/json')})
          //  .map((response: Response) => this.isLogIn=true)
          .catch((error: Response) => Observable.throw(error)); 
  }

  isLoggedInFaceBook() {

    var token=this.cookieService.get('token');
    const body = JSON.stringify({'access_token':token});
    return this.httpClient.post(facebookAuthAdress, body)
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
