import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { AdminService } from './admin.service';
import { ProductEditomponent } from './product-edit/product-edit.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    ProductEditomponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AdminService
  ]
})
export class AdminModule {}
