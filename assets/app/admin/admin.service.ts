import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../objectModels/user.model';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Product } from '../objectModels/product.model';


@Injectable()

export class AdminService {
  token: string;

  constructor(private router: Router,private httpClient:HttpClient) {}

  saveProduct(product:Product){
    const body = JSON.stringify(product);
    return this.httpClient.post('http://localhost:3000/admin/add-product', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        // .map((response: Response) => response.json())
        .catch((error: Response) =>  Observable.throw(error)  
      );

  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
