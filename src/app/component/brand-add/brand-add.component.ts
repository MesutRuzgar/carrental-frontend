import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private brandAddModal: MatDialogRef<BrandAddComponent>) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required],      
    })
    }
    closeBrandAddModal() {
      this.brandAddModal.close();
    }
    add(){
      if(this.brandAddForm.valid){
        let brandModel = Object.assign({},this.brandAddForm.value)
        this.brandService.add(brandModel).subscribe(response=>{      
        this.toastrService.success(response.message,"Başarılı") 
        },responseError=>{
          console.log(responseError)
            if(responseError.error.success==false){          
            this.toastrService.error(responseError.error.message,"Doğrulama Hatası")          
          }      
        })      
      }else{
        this.toastrService.error("Formunuz eksik","Lütfen gerekli alanları doldurunuz");
      }
    
    }
    
}
