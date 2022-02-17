import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brands';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  currentCar:Car;
  colors:Color[]=[];
  brands:Brand[]=[];
  carUpdateForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private carUpdateModal: MatDialogRef<CarUpdateComponent>,
    private colorService:ColorService,
    private brandService:BrandService,
    private carService:CarService,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelName:["",Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findeksScore: ["",Validators.required]
    })
  }

  update() {
    let carModel = Object.assign({}, this.carUpdateForm.value);
    carModel.id=this.currentCar.carId;
    console.log(carModel)
    if (this.carUpdateForm.valid) {
      this.carService.update(carModel).subscribe((response) => {
        this.toastrService.success("Araç Başarıyla Güncellendi");
      }, (responseError) => {
        
        if (responseError.error.Errors) {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
            }
          }
        }
        else {
          this.toastrService.error(responseError.error.Message);
        }
      });
    } else {
      this.toastrService.error("Lütfen formu doldurunuz!");
    }
  }
   getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

   getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  closeCarUpdateModal() {
    this.carUpdateModal.close();
  }
}

