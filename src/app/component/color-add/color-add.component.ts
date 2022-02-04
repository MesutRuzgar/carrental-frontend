import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private colorAddModal: MatDialogRef<ColorAddComponent>) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required],      
    })
    }
    closeColorAddModal() {
      this.colorAddModal.close();
    }
    
    add(){
      if(this.colorAddForm.valid){
        let colorModel = Object.assign({},this.colorAddForm.value)
        this.colorService.add(colorModel).subscribe(response=>{
      
        this.toastrService.success(response.message,"Başarılı");
        this.closeColorAddModal();
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
