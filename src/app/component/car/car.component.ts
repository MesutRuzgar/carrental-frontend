import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brands';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import {Color} from 'src/app/models/color'
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
   
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  currentCar:Car;
  brands:Brand[]=[];
  colors:Color[]=[];
  brandId:number=0;
  colorId:number=0; 
  filterText="";
  dataLoaded=false;

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private carImageService:CarImageService,
   ) { }

  ngOnInit(): void {
    this.colorService.getColors().subscribe(params=>{
      this.colors=params.data
    })
    this.brandService.getBrands().subscribe(params=>{
      this.brands=params.data;
    })
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
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
  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByColorId(colorId:number){
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  setCurrentCar(car:Car){
    this.currentCar=car;
  }
  setCurrentDetail(car:Car){
    this.currentCar=car;
  }
  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.cars=response.data
    })
  }
  getImagePath(imagePath:string){ 
    return this.carImageService.getImagePath(imagePath);
   }
 
  getCarsWithBrandAndColor(){
    if(this.brandId == 0 && this.colorId ==0){
      this.getCars()
    }
    else if(this.brandId == 0){
      this.getCarsByColorId(this.colorId)
    }
    else if(this.colorId == 0){
      this.getCarsByBrandId(this.brandId)
    }
    else{
      this.carService.getCarsWithBrandAndColor(this.brandId,this.colorId).subscribe(response=>{
        this.cars = response.data
      })
    }
  }
}