import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';


const appRoutes: Routes = [
  { path: '', redirectTo:'/products',pathMatch:'full'},
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductDetailComponent}
//   { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
//   { path: 'signin', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
