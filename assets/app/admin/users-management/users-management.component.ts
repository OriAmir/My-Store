import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../objectModels/user.model';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Product } from '../../objectModels/product.model';

var usersPerPage:number=5; //How many users will show on the the page by deafult
const maxButtonsPerUsers:number=5;//what is the maxuimum buttons show with numbers on screen

@Component({
    selector: 'app-users-management',
    templateUrl: './users-management.component.html',
    styleUrls: ['./users-management.component.css']
})

export class UsersManagementComponent implements OnInit  {
    constructor(private adminService: AdminService, private router: Router,private fb:FormBuilder) { }
     private optionsShowUsers=[5,10,20,50]; //Options for name of users show per page
    
     private users=[]; //Contain all users from server
     private usersCount:number; //How many users exist in total
     private numbers=[];//Contain the 'numbers' on the buttons 
     private currentButtonClicked=0; //Contain which button is clicked now
     private lastPageNumber:number=0; //Contain the lastPage number that calculate by usersCount and usersPerPage
     private firstTimeLoadUsers=true; //Is is first time page load users or it's another click
     private buttonBackAvailable=false; //Represnets if to show 'back' button or not
     
     private currentMinButtonsValue=0; //Contain which min button value to show
     private currentMaxButtonsValue=maxButtonsPerUsers; //Contain which max button value to show

    ngOnInit() {
        this.getUsersCount();
    }

    private getUsersCount()
    {

        this.adminService.getUsersCount().subscribe(
            data=>{
                this.usersCount=data.val; //Get number of total user exists
                this.lastPageNumber=Math.ceil(this.usersCount/usersPerPage); //Calculate number of pages
                this.numbers=Array(this.lastPageNumber).fill(0).map((x,i)=>i);  //Initialize array with all pages

                if(this.currentMaxButtonsValue>=this.lastPageNumber)
                    this.currentMaxButtonsValue=this.lastPageNumber;
                else
                     this.currentMaxButtonsValue=maxButtonsPerUsers;
                
                this.firstTimeLoadUsers=true;                    
                this.getMoreUsersByIndex(0);
                
            }
        )
    }



    selctedCahnge(event)
    {
        usersPerPage=parseInt(event.target.value);
        this.getUsersCount();
   }


    backCliked()
    {
         //First page check
        if(this.currentMaxButtonsValue==maxButtonsPerUsers || this.currentMinButtonsValue<=0 )
            return;
        
        //Update max value of buttons
        if(this.currentMaxButtonsValue-maxButtonsPerUsers>maxButtonsPerUsers)
            this.currentMaxButtonsValue-=maxButtonsPerUsers;
        else
            this.currentMaxButtonsValue=maxButtonsPerUsers;
        
        //Update min value of buttons
        this.currentMinButtonsValue-=maxButtonsPerUsers;          
        if(this.currentMinButtonsValue<=0)
        {
            this.currentMinButtonsValue=0;
            this.buttonBackAvailable=false;
        }                

    }

    forwardClick()
    {
             //No More result,no need of foward button
            if(this.currentMinButtonsValue>=this.lastPageNumber || this.currentMaxButtonsValue>=this.lastPageNumber)
                return; 

            
            this.buttonBackAvailable=true; //If we move forward we must have 'back' button


            if(this.currentMaxButtonsValue+maxButtonsPerUsers >=this.lastPageNumber){ // not Exist enough result to show all buttons 
                this.currentMaxButtonsValue=this.lastPageNumber;
                this.currentMinButtonsValue=this.lastPageNumber-maxButtonsPerUsers;
                if(this.currentMinButtonsValue<0)
                      this.currentMinButtonsValue=0;
            }
            else{ //Exist enough result to show all buttons 
                this.currentMaxButtonsValue+=maxButtonsPerUsers;
                this.currentMinButtonsValue+=maxButtonsPerUsers;                
            }
    }

    getMoreUsersByIndex(i)
    {

        console.log("clickes=>"+i);
        if(!this.firstTimeLoadUsers && this.currentButtonClicked==i)
            return;  
        
        this.currentButtonClicked=i;
        this.firstTimeLoadUsers=false;                    
        

        var details={
            usersPerPage:usersPerPage,
            pageClicked:i
        }
        this.adminService.getPartOfUsers(details).subscribe(
            data=>{console.log(data);this.users=data.val;},
            error=>{console.log(error)}
        )

    }

        // getAllUsers()
    // {
    //     this.adminService.getAllUsers().subscribe(
    //         data=>{console.log(data);this.users=data.val;},
    //         error=>{console.log(error)}
    //     )
    // }

  
    
}