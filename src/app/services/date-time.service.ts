import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  
  calculateRent(returnDate:Date,rentDate:Date):number{
    let date1 = new Date(returnDate);
    let date2 = new Date(rentDate);
    var hours = date1.getTime() - date2.getTime();
    var days = Math.ceil(hours / (1000*3600*24))
    return days;
   }
  
   getFullDateTimeNow():string{
    let date = new Date();
    let returnStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    return returnStr;
  }

}
