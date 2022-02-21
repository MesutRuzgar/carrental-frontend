import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CarImageService } from 'src/app/services/car-image.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];

  constructor(
    private cartService:CartService,
    private toastrService:ToastrService,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getCart();
  }
  
  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(car:Car){
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.modelName+ "  Sepetten silindi.");
  }
  getImagePath(imagePath:string){ 
    return this.carImageService.getImagePath(imagePath);
   }
  goToCart():void{}
}
