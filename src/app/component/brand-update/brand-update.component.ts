import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brands';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  currentBrand: Brand;
  brandUpdateForm: FormGroup
  constructor(private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<BrandUpdateComponent>
  )  { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }
  closeUpdateModal() {
    this.updateModal.close();
  }
  update() {
    if (this.brandUpdateForm.valid) {
      let newBrand = Object.assign({}, this.brandUpdateForm.value);
      newBrand.id = this.currentBrand.id;
      if (newBrand.brandName == this.currentBrand.brandName) {
        this.toastrService.error("Marka adı eskisiyle aynı olamaz!", "Güncelleme yapılmadı");
        return;
      } else {
        this.brandService.update(newBrand).subscribe(response => {
          this.toastrService.success(this.currentBrand.brandName + ", " + newBrand.brandName + " şeklinde güncellendi", "Güncelleme başarılı");
          this.closeUpdateModal();
        }, errorResponse => {
          //Back-end Validation Errors
          if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
            for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
              this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
            }
          }
          //Back-end Validation ok but other errors  
          else {
            this.toastrService.error(errorResponse.error.message, "Güncelleme başarısız");
          }
        })
      }
    } else {
      this.toastrService.error("Marka adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.brandUpdateForm.reset();
    }
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

}
