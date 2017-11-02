import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Product } from '../objectModels/product.model';
import { AuthService } from '../auth/auth.service';


@Injectable()

export class ProductsService{
  token: String;
  constructor(private router: Router,private httpClient:HttpClient, private authService: AuthService) {}

  getProdut(id:String)
  {
    const body = JSON.stringify({'productId':id});
    return this.httpClient.post('http://localhost:3000/products/getProduct', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
         .map((response: Response) => {
          const product = response.obj;
            var curProduct=new Product(
              product.name,
              product.category,
              product.price,
              product.description,
              product.image
            );
            return curProduct;
         })
        .catch((error: Response) => Observable.throw(error)); 
  }

  getProducts() {
    return this.httpClient.get('http://localhost:3000/products/getProducts')
        .map((response: Response) => {
          console.log("response:");
          console.log(response);
            const products = response.obj;
            let transformedProsucts: Product[] = [];
            for (let product of products) {
              var curProduct=new Product(
                product.name,
                product.category,
                product.price,
                product.description,
                product.image                     
           );
             curProduct._id=product._id;
              transformedProsucts.push(curProduct);
            }
           // this.messages = transformedMessages;
            return transformedProsucts;
        })
        .catch((error: Response) => {
           // this.errorService.handleError(error.json());
            return Observable.throw(error);
        });
  }

  addProductToUser(productId)
  {
    if(!this.authService.isExistCookie()){
      console.log("user not log-in");
      return;
    }

    this.authService.isLoggedIn().subscribe(
      data=>{
        var userId=this.authService.getUserId();
        const body = JSON.stringify({'userId':userId,
                                    'productId':productId  });
                                             
       return this.httpClient.post('http://localhost:3000/products/addProductToUser', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        .subscribe(
            (response: Response) => {
              console.log(response);
            
          },
          error => {console.log(error);}
       )

    },
    error => console.log(error)
   ) 

  }

}
