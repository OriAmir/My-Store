import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
    
    constructor(private authService:AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
        if(!this.authService.isExistCookie())
              return false;                
        
        return this.authService.isLoggedIn().map(
            data=>{
                if(data.val.user.role==100) //isAdmin
                    return true;

                return false;                
            },
            error=>{ console.log("errrror");return true;}
        )

    }

}