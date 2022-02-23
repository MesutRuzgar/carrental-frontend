import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {
  deletedCar: Car;
  constructor(
    private carDeleteModal: MatDialogRef<CarDeleteComponent>,
    private carImageService: CarImageService,
    private carService: CarService,
    private toastrService: ToastrService
  
  ) { }

  ngOnInit(): void {
  
  }
 
  delete(car: Car) {
    this.carService.delete(car).subscribe(response => {
      this.toastrService.success(car.brandName + " " + car.modelName + " isimli araç silindi", "Silme işlemi başarılı");
      this.closeCarDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }
  getImagePath(imagePath:string){    
   this.carImageService.getImagePath(imagePath);
  } 
  
  closeCarDeleteModal() {
    this.carDeleteModal.close();
  }
 
}
