import { Component, OnInit } from '@angular/core';
import {Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  totalEarnings:number;
  rentals:Rental[]=[];
  dataLoaded=false;

  constructor(private rentalService:RentalService,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getRentals();
    this.getTotalEarnings();
     
    }
    getRentals(){
      this.rentalService.getRentals().subscribe(response=>{
        this.rentals=response.data
        this.dataLoaded=true;
      })
    }
    getImagePath(imagePath: string) {
      return this.carImageService.getImagePath(imagePath);
    }

    getTotalEarnings(){
      this.rentalService.getTotalEarnings().subscribe(response=>{
        this.totalEarnings=response.data;
      })
    }
  }


