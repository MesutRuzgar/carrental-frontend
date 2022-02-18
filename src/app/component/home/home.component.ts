import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customerDetailDto';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLoggedIn:boolean = false;
  customerId:number;
  currentUser:UserForLogin;
  
  constructor(
    private authService:AuthService,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser()!;
    this.setUserLoggedIn();
    
  }

  
  getCustomer() { 
    if(this.userLoggedIn){ 
    this.customerService.getCustomerByUserId(this.currentUser.id).subscribe(response => {
    this.customerId=response.data?.id;  
    if(this.customerId==null){
      let addedCustomer = new Customer;
      addedCustomer.userId = this.currentUser.id;
      addedCustomer.companyName = " Rent A Car ";
      this.customerService.addCustomer(addedCustomer).subscribe(successAddedResult => {
      this.customerId=successAddedResult.data.id;          
       });
    }
  })
 }       
}; 


  setUserLoggedIn() {
    this.userLoggedIn = this.authService.isAuthenticated()
    this.getCustomer();
  }

}
