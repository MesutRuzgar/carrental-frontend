import { Component, OnInit } from '@angular/core';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { CustomerDetailDtoService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers:CustomerDetailDto[]=[];
  dataLoaded=false;

  constructor(private customerDetailDtoService:CustomerDetailDtoService) { }

  ngOnInit(): void {
    this.getCustomers();
  }
getCustomers(){
  this.customerDetailDtoService.getCustomers().subscribe(response=>{
    this.customers=response.data
    this.dataLoaded=true;
  })
}
}
