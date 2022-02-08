import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-user-rentals-details',
  templateUrl: './user-rentals-details.component.html',
  styleUrls: ['./user-rentals-details.component.css']
})
export class UserRentalsDetailsComponent implements OnInit {
  
  rentals:Rental[]=[];

  constructor(
    private rentalService:RentalService,
    private authService:AuthService,
    private carImageService:CarImageService,
    private carService:CarService
    ) { }

  ngOnInit(): void {
    this.GetRentalUserDetails();
  }
  getImagePath(imagePath: string) {
    return this.carImageService.getImagePath(imagePath);
  }
 

GetRentalUserDetails(){
  let userId=this.authService.getUser().id;
  this.rentalService.GetRentalUserDetails(userId).subscribe(response=>{
    this.rentals=response.data    
  })
}
}
