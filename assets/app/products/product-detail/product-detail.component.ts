import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../objectModels/product.model';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-productDetail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

        product:Product;

    constructor(private productsService:ProductsService,
                private route: ActivatedRoute ,
                private router: Router,
                ){}
    
    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params )=>{
                console.log('get parmas');
                console.log(params);
                this.productsService.getProdut(params.id).subscribe(
                    (product:Product)=> {
                        this.product=product;
                    }
                )
            }
        )

    }

    // @Input() product: Product;
    // @Input() index: number;
    



}