import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customerDetailDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  cars:Car[]=[];
  rentals:Rental[]=[];
  customers:Customer[]=[];

  constructor(
    private carService:CarService,
    private rentalService:RentalService,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    this.getCars();
    this.getRentals();
    this.getCustomers();
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
    this.cars=response.data;
    })
  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
    })
  }
  getCustomers(){
    this.customerService.getCustomerDetails().subscribe(response=>{
      this.customers=response.data;
})
  }
}
