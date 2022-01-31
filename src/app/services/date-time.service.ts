import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    let hours = Math.abs(returnDate.getTime() - rentDate.getTime());
    let days = Math.ceil(hours / (1000 * 3600 * 24));
    return days;
  }
}
