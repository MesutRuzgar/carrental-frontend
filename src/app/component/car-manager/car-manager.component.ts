import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CarAddComponent } from '../car-add/car-add.component';
import { CarDeleteComponent } from '../car-delete/car-delete.component';
import { CarUpdateComponent } from '../car-update/car-update.component';

@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css']
})
export class CarManagerComponent implements OnInit {
  cars: Car[];
  filterText:"";

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getImagePath(imagePath: string) {
    return this.carImageService.getImagePath(imagePath);
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    })
  }

  showCarUpdateModal(car: Car) {
    const carUpdateModal = this.dialog.open(CarUpdateComponent, {
      disableClose: true,
      width: "40%"
    });
    carUpdateModal.componentInstance.currentCar = car;

    carUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarDeleteModal(car: Car) {
    const carDeleteModal = this.dialog.open(CarDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    carDeleteModal.componentInstance.deletedCar = car;

    carDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarAddModal() {
    const carAddModal = this.dialog.open(CarAddComponent, {
      disableClose: true,
      width: "40%",
    });

    carAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  
}


