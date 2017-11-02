import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService:AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      
        if(!this.authService.isExistCookie())
            return true;
            
        return this.authService.isLoggedIn().map(
            data=>{
                console.log(data);
                return false;
            },
            error=>{ console.log("errrror");return true;}
        )

    }

}