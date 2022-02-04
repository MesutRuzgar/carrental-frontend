import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  currentColor: Color;
  colorUpdateForm: FormGroup
  constructor(private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<ColorUpdateComponent>
  )  { }

  ngOnInit(): void {
    this.createColorUpdateForm();
  }
  closeUpdateModal() {
    this.updateModal.close();
  }
  update() {
    if (this.colorUpdateForm.valid) {
      let newColor = Object.assign({}, this.colorUpdateForm.value);
      newColor.id = this.currentColor.id;
      if (newColor.colorName == this.currentColor.colorName) {
        this.toastrService.error("Renk adı eskisiyle aynı olamaz!", "Güncelleme yapılmadı.");
        return;
      } else {
        this.colorService.update(newColor).subscribe(response => {
          this.toastrService.success(this.currentColor.colorName + ", " + newColor.colorName + " şeklinde güncellendi", "Güncelleme başarılı");
          this.closeUpdateModal();
        }, errorResponse => {
         
          if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
            for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
              this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
            }
          }
           
          else {
            this.toastrService.error(errorResponse.error.message, "Güncelleme başarısız");
          }
        })
      }
    } else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.colorUpdateForm.reset();
    }
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

}
