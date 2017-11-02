import { Component, Input } from '@angular/core';
import { Product } from '../../../objectModels/product.model';
import { ProductsService } from '../../products.service';

@Component({
    selector: 'app-productItem',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

    @Input() product: Product;
    @Input() index: number;
    color:{};
    textDetails=false;

    changeStyle($event)
    {
        console.log($event.type);
        
        if($event.type =='mouseover' ){
            this.color={"opacity":"0.3"};
            this.textDetails=true;
        }
        else{
            this.color={"opacity":"1"};
            this.textDetails=false;
            
        }
        
    }
    constructor(private productsService:ProductsService){}
    addProduct(id:string)
    {
        this.productsService.addProductToUser(id);
        console.log("product clickes:");
        console.log(id);
    }

}