import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../objectModels/user.model';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FileValidator } from '../../shared/file-input.validator';
import { Product } from '../../objectModels/product.model';

@Component({
    selector: 'app-productEdit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditomponent implements OnInit  {
    productForm: FormGroup;
    categoryList=['Sport','Wear','Cosmetic'];
    isExistImage=false;
    imagePath="";
    constructor(private adminService: AdminService, private router: Router,private fb:FormBuilder) { }
    
    ngOnInit() {
        
        this.initForm();
    }
        
    private initForm() {
        let name = '';
        let description = '';
        let price = '';
        let category=[];
        let image='';

        this.productForm = this.fb.group({
            name:['',Validators.required],
            category:'A',
            description:['',Validators.maxLength(300)],
            price:['',Validators.required],
        })
    }

    onChange(files)
    {
        console.log("files: ");
        console.log(files);

        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e) =>
        {
            console.log("result:")
            this.isExistImage=true;
            this.imagePath=myReader.result;
            console.log(myReader.result);
        }
        myReader.readAsDataURL(files[0]);
    }
    onSubmit() {

        console.log(this.productForm);        
        
        const product = new Product(
            this.productForm.value['name'],
            this.productForm.value['category'],
            this.productForm.value['price'],
            this.productForm.value['description'],
            this.imagePath
        );

        console.log("current product: ");
        console.log(product);
        
        this.adminService.saveProduct(product)
                .subscribe(
                    data=>{
                        console.log("PRODUCT SAVE");

                    },
                    error=>console.log(error)
                );
    }

    
}