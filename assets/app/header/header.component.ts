import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
    displayName="";
    isExistUser=false;
    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        
        var dn=this.authService.getDisplayName();
        if( dn && dn!=null){
             this.isExistUser=true;
             this.displayName=dn;
        }

        this.authService.userLogOutEvent.subscribe(
            ()=>{this.isExistUser=false; 
                this.displayName="";}
        );
    }

}