import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car:Car;
  cardetail:Car;
  currentDetail:Car;
  carImages:CarImage[]=[];
  imgUrl="https://localhost:44322";

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,   
    private toastrService:ToastrService,
    private cartService:CartService) { }

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
        this.carImages=result.data
      })     
    }
    getPath(path:string){
      return this.imgUrl+path;
    }
    setCurrentDetail(car:Car){
    this.currentDetail=car;
    }

    addToCart(car:Car,rentDate:Date,returnDate:Date){
      this.toastrService.success("Sepete eklendi.",car.carName)
      this.cartService.addToCart(car,rentDate,returnDate);
      }
      
            
      
}
