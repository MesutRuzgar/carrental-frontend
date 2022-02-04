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
        this.closeBrandAddModal(); 
        },responseError=>{
          if(responseError.error.success==false){
            this.toastrService.error(responseError.error.message,"İşlem sırasında hata oluştu.")      
          }
          else if(responseError.error.ValidationErrors.length>0){          
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")            
            }          
          }      
        })      
      }else{
        this.toastrService.error("Formunuz eksik","Lütfen gerekli alanları doldurunuz");
      }    
    }
    
    
}
