import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';



@Component({
  
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
   
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  currentCar:Car;
  imgUrl="https://localhost:44322";
  defaultImage="/default.png"
  dataLoaded=false;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandName"]){
        this.getCarsByBrand(params["brandName"])
      }
      else if(params["colorName"]){
        this.getCarsByColor(params["colorName"])
      }
      else if(params["carId"]){
        this.getCarById(params["carId"])
      }
      else{
        this.getCars()
      }
    })
    
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandName:string){
    this.carService.getCarsByBrand(brandName).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorName:string){
    this.carService.getCarsByColor(colorName).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  SetCurrentCar(car:Car){
    this.currentCar=car;
  }
  SetCurrentDetail(car:Car){
    this.currentCar=car;
  }
  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.cars=response.data
    })
  }
  getPath(images:CarImage[]){    
    return this.imgUrl+images[0].imagePath;
  }
}