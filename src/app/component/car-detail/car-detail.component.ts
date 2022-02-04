import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CarImageService } from 'src/app/services/car-image.service';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:Car[];
  currentDetail:Car;
  carImages:CarImage[]=[];
 

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,   
    private toastrService:ToastrService,
    private cartService:CartService,
    private carImageService:CarImageService) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params=>{
      this.getByCarId(params["carId"])
      this.getByCarImage(params["carId"])      
    })   
    } 

    getByCarId(carId:number){      
       this.carService.getCarById(carId).subscribe(response=>{
        this.carDetails=response.data
        
      })
    }
    getByCarImage(carId:number){
      this.carService.getCarByImage(carId).subscribe(response=>{
        this.carImages=response.data
      })     
    }
    getImagePath(imagePath:string){ 
      return this.carImageService.getImagePath(imagePath);
     }
   
    setCurrentDetail(car:Car){
    this.currentDetail=car;
    }

    addToCart(car:Car,rentDate:Date,returnDate:Date){
      this.toastrService.success("Sepete eklendi.",car.modelName)
      this.cartService.addToCart(car,rentDate,returnDate);
      }
      
            
      
}
