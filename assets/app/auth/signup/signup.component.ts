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

        const user = new User(
            this.signupForm.value['email'],
            this.signupForm.value['password'],
            50,
            this.signupForm.value['firstName'],
            this.signupForm.value['lastName'],
        );

        this.authService.signupUser(user)
          .subscribe(
              data => {
                console.log(data);
                this.router.navigateByUrl('/signin');
                
              },
              error => {
                var errorMsg=JSON.parse( error.error);
                this.errorService.handleError(errorMsg); //Set eror message on screen
              }
          );
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