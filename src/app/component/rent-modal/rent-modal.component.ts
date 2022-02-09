import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.css']
})
export class RentModalComponent implements OnInit {
  car:Car;
  cardetail:Car;
  carImage:CarImage;
  ikiTarihAraligiVarMi:boolean=false;
  returnDate:Date;
  rentDate:Date;
  toDayDate:Date;
  findeksScore:number=0;
 

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,   
    private toastrService:ToastrService,
    private cartService:CartService,
    private rentalService:RentalService,
    private carImageService:CarImageService,
    private creditCardService:CreditCardService,
    private authService:AuthService
    ) { }

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
  getImagePath(imagePath:string){ 
    return this.carImageService.getImagePath(imagePath);
   } 
   

  checkDateAndFindeksScore(carId:number,rentDate:Date,returnDate:Date){
     let userId=this.authService.getUser().id;
     this.creditCardService.getUserFindeks(userId).subscribe(response=>{
      this.findeksScore=response.data.findeksScore;
      if(this.findeksScore>=this.cardetail.findeksScore){
          this.rentalService.getCheckRentDate(carId,rentDate,returnDate).subscribe(result=>{
          this.ikiTarihAraligiVarMi=result.data;
          if(this.ikiTarihAraligiVarMi){
            this.toastrService.error("Araç seçili tarihler arasında kiradadır. Lütfen başka tarih deneyiniz");
          }else if(rentDate>returnDate){
            this.toastrService.error("Teslim tarihi,Kiralama tarihinden önceki bir tarih olamaz!","Lütfen gerekli alanları düzeltiniz!");
          }
          else{     
            this.cartService.addToCart(this.cardetail,rentDate,returnDate);        
            document.getElementById("kapatbutonu").click();           
          }
        });
      }
      else
      {
        this.toastrService.error("Findeks Puanınız Araç İçin Yeterli Değil.","Lütfen Başka Araç Kiralamayı Deneyiniz")
      }
     });
      
  }
  
}
