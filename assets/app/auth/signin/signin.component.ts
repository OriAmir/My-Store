import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../objectModels/user.model';
import { Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { ErrorService } from '../../errors/error.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit  {

    signinForm: FormGroup;
    public currentUser : any = {};
    public loading=false;
    
    constructor(private authService: AuthService,
                private router: Router,
                private cookieService: CookieService,
                private errorService: ErrorService) { }
    
          
    ngOnInit() {
        this.initForm();
    }
        
    private initForm() {
        let email = '';
        let password = '';

        this.signinForm = new FormGroup({
            'email': new FormControl(email, [Validators.required,Validators.email]),
            'password': new FormControl(password, Validators.required)
        });
    }

    fbLogin() {
        this.authService.fbLogin().then((res) => {

          console.log('User has been logged in with facebook');
          var isAdmin=false;
          
            if(this.isUserAdmin(res))
                isAdmin=true;
        
            this.authService.userLogInEvent.emit(isAdmin);                    
            this.router.navigateByUrl('/');
                
        },
        (error)=>console.log(error)
    
    );  }


    onSubmit() {

        const user={
            email:             this.signinForm.value['email'],

            password:            this.signinForm.value['password'],
            
        };
    
        this.authService.signinUser(user)
            .subscribe(
                data => {
                   // const allCo:{}=this.cookieService.getAll();
                    var isAdmin=false;

                    if(this.isUserAdmin(data))
                        isAdmin=true;

                    this.authService.userLogInEvent.emit(isAdmin);                    
                    this.router.navigateByUrl('/');
                },
                error => {
                    var errorMsg=JSON.parse( error.error);
                    this.errorService.handleError(errorMsg);
                }
            );
        this.signinForm.reset();
    }

    isUserAdmin(user)
    {
        if(user.role==100)
            return true;

        return false;
    }
}