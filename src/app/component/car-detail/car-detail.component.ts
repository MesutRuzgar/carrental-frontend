import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailDtoService } from 'src/app/services/carDetailDto.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cardetail:CarDetailDto;
  carImage:CarImage;
  imgUrl="https://localhost:44322"

  constructor(private carDetailDtoService:CarDetailDtoService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params=>{
      this.getByCarId(params["carId"])
      this.getByCarImage(params["carId"])      
    })   
    } 
    getByCarId(carId:number){
      this.carDetailDtoService.getCarById(carId).subscribe(result=>{
        this.cardetail=result.data[0]
      })
    }
    getByCarImage(carId:number){
      this.carDetailDtoService.getCarByImage(carId).subscribe(result=>{
        this.carImage=result.data[0]
      })     
    }
    getPath(path:string){
      return this.imgUrl+path;
    }
}
