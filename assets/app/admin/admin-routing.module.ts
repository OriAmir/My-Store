import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditomponent } from './product-edit/product-edit.component';
import { AdminGuard } from './admin-guard.service';

const authRoutes: Routes = [
  { path: 'admin/product-edit', component: ProductEditomponent ,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
