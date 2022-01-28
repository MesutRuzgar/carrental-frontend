import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cardetail:Car;
  currentDetail:Car;
  carImage:CarImage;
  closeModal: string;
  minDate?: string = '';
  maxDate?: string = '';
  rentDate:Date;
  returnDate:Date;
  message:string
  imgUrl="https://localhost:44322";

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,private cartService:CartService,private modalService: NgbModal) { }

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
    setCurrentDetail(car:Car){
    this.currentDetail=car;
    }
    addToCart(car:Car){
      this.toastrService.success("Sepete eklendi.",car.carName)
      this.cartService.addToCart(car);
      }
      triggerModal(content:any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
          this.closeModal = `Closed with: ${res}`;
        }, (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        });
      }
      
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
      totalAmount(){
        let differance = new Date(this.returnDate).getTime() -  new Date(this.rentDate).getTime();
        let price = new Date(differance).getDate();
        // this.paymentService.totalPrice = price * this.carforRent.dailyPrice;
      }
    
    
      minDateChange(date: any) {
        this.minDate = date.target.value;
        // this.maxDate = this.datePipe.transform(
        //   new Date(
        //     new Date(this.minDate).setFullYear(new Date().getFullYear() + 1)
        //   ),
        //   'yyyy-MM-dd'
        // );
      }
}
