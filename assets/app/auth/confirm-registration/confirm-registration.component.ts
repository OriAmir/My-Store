import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../objectModels/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { ErrorService } from '../../errors/error.service';

@Component({
    selector: 'app-confirmReg',
    templateUrl: './confirm-registration.component.html',
    styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit  {
    
    constructor(
        private route: ActivatedRoute ,
        private router: Router,
        private authService:AuthService,
        private errorService: ErrorService        ){}

        ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params )=>{
                console.log('get parmas');
                console.log(params);

                this.authService.confirmRandomKeyUser(params.id).subscribe(
                    data => console.log(data),
                    error=> {this.errorService.handleError(error.error)}

                )


            }
          )

        }

    
}