import {Pipe,PipeTransform} from '@angular/core';


@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform{

    transform(value: any, filterString:string,propName:string):any {

        if(filterString=="" || value.length === 0)
            return value;

        const resArray=[];
            
      //  var res = (guests[k].guestName).substring(0,guestName.length ); 
        
        for( const item of value)
            if(item[propName].substring(0,filterString.length).toLowerCase()==filterString.toLowerCase())
                resArray.push(item);
            

        return resArray;

    }


    
}