import { Component, OnInit } from '@angular/core';
import { Product } from '../../objectModels/product.model';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-productList',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    products:Product[];
    filterName='';
    constructor( private productsService: ProductsService){}

    ngOnInit(): void {

        this.productsService.getProducts()
        .subscribe(
            (products: Product[]) => {
                this.products = products;
            }
        );

        
    }
}