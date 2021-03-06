import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brands';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand:Brand; 
  filterText="";
  dataLoaded=false;
  constructor(private brandService:BrandService,
   private router:Router) { }

  ngOnInit(): void {
    this.getBrands();

  }
getBrands(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data
    this.dataLoaded=true;
  })

}
SetCurrentBrand(brand:Brand){
  this.currentBrand=brand;
}

getCurrentBrandClass(brand:Brand){
  if(brand==this.currentBrand){
    return "list-group-item active"
  }
  else{
    return "list-group-item"
  }
  }
  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{
     return "list-group-item"
    }
  }
  resetCurrentBrand() {
    this.currentBrand = {id:0, brandName:""};
  }
  goBrandManager(){
    this.router.navigate(["brands/manager"])
  }
}
