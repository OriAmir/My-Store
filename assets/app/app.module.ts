import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AdminModule } from './admin/admin.module';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminGuard } from './admin/admin-guard.service';
import { ProductsService } from './products/products.service';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { FilterPipe } from './products/product-list/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { MailService } from './shared/mail.service';
import { Footeromponent } from './footer/footer.component';
import {LoadingModule} from 'ngx-loading';

@NgModule({
    declarations: [AppComponent,
                   HeaderComponent,
                   ProductsComponent,
                   ProductListComponent,
                   ProductItemComponent,                   
                   ProductDetailComponent,
                   Footeromponent,
                   AuthComponent,
                   ErrorComponent,                   
                   FilterPipe
                   ],
    imports: [BrowserModule,
              HttpClientModule, 
              AppRoutingModule,                
              AuthModule,
              AdminModule,
              FormsModule,
              LoadingModule
            ],
    bootstrap: [AppComponent],
    providers:[ProductsService,ErrorService,MailService,AuthGuard,AdminGuard]
})
export class AppModule {

}