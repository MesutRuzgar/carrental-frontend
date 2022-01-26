import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarDetailDtoService } from 'src/app/services/carDetailDto.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
   
})
export class CarComponent implements OnInit {
  cars:CarDetailDto[]=[];
  currentCar:CarDetailDto;
  public dialog:MatDialog;
  dataLoaded=false;

  constructor(private carDetailDtoService:CarDetailDtoService,private activatedRoute:ActivatedRoute) { }

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
    this.carDetailDtoService.getCars().subscribe(response=>{
      this.cars=response.data;
this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandName:string){
    this.carDetailDtoService.getCarsByBrand(brandName).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorName:string){
    this.carDetailDtoService.getCarsByColor(colorName).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  SetCurrentCar(car:CarDetailDto){
    this.currentCar=car;
  }
  SetCurrentDetail(car:CarDetailDto){
    this.currentCar=car;
  }
  getCarById(carId:number){
    this.carDetailDtoService.getCarById(carId).subscribe(response=>{
      this.cars=response.data
    })
  }
}