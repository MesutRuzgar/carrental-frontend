import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cardetail:Car;
  carImage:CarImage;
  imgUrl="https://localhost:44322";

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params=>{
      this.getByCarId(params["carId"])
      this.getByCarImage(params["carId"])      
    })   
    } 
    getByCarId(carId:number){
      this.carService.getCarById(carId).subscribe(result=>{
        this.cardetail=result.data[0]
      })
    }
    getByCarImage(carId:number){
      this.carService.getCarByImage(carId).subscribe(result=>{
        this.carImage=result.data[0]
      })     
    }
    getPath(path:string){
      return this.imgUrl+path;
    }
}
