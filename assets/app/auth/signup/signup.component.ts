import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators ,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../objectModels/user.model';
import { Router } from '@angular/router';
import { ErrorService } from '../../errors/error.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {

    signupForm: FormGroup;
    public loading=false;

    constructor(private authService: AuthService,
                private router: Router,
                private errorService: ErrorService ) { }
    
    ngOnInit() {
            this.initForm();
      }

      private initForm() {
        let firstName = '';
        let lastName = '';
        let email = '';
        let password = '';
    
        this.signupForm = new FormGroup({
          'firstName': new FormControl(firstName, Validators.required),
          'lastName': new FormControl(lastName, Validators.required),
          'email': new FormControl(email, [Validators.required,Validators.email]),
          'password': new FormControl(email, Validators.required)
        });
      }

      onSubmit() {
        this.loading=true;
        
        const user = new User(
           this.signupForm.value['firstName'],
            this.signupForm.value['lastName'],
            this.signupForm.value['password'],            
            this.signupForm.value['email'],
            [],
            50,
            false,
            ''
        );
        this.authService.signupUser(user)
          .then(
              data => {
                //console.log("return to signupcompnent:")
              //  console.log(data);
              this.loading=false;
              this.errorService.handleError({'title':'test','message':'gggg'}); //Set eror message on screen
              
              this.router.navigateByUrl("/signin");

              
              },
              error => {
                this.loading=false;                
                console.log("error");
                console.log(error);
                var errorMsg=JSON.parse( error.error);
                this.errorService.handleError(errorMsg); //Set eror message on screen
              }
          ),(err)=>console.log("errrrrror:");
         this.signupForm.reset();
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

        isUserAdmin(user)
        {
            if(user.role==100)
                return true;
    
            return false;
        }


}