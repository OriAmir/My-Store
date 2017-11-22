import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit {

    constructor(private authService: AuthService) { }
    
    isConnect=false;
    isAdmin=false;

   ngOnInit(): void {
       
    // this.authService.fbGetLoginstatus().then((res) => {
    //     console.log("GET  response of fb login status = > ");
    //     console.log(res);
    //   }); 

    this.authService.userLogInEvent.subscribe(
        (isAdmin)=>{
            if(isAdmin)
                this.isAdmin=true;

            this.isConnect=true;
        }
    )

    if(this.authService.isExistCookie())
    {
        this.authService.isLoggedIn()
        .subscribe(
            data => {
                console.log("DATAAAA=>");
                console.log(data);
                this.isConnect=true;
                if(data.val.user.role==100) //isAdmin
                    this.isAdmin=true;
                else
                    this.isAdmin=false;      
                    
                    console.log("User log in. Is user admin?  "+this.isAdmin);
                    console.log(data);
                    },
            error => console.log(error)
        );
    }

    }
      onLogOut()
      {
        this.authService.logOutUser();
        this.isConnect=false;
        this.isAdmin=false;
      }
}