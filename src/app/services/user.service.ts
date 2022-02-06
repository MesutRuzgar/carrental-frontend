import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModule';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "https://localhost:44322/api/";
  constructor(private httpClient: HttpClient) { }

  updateProfile(user: User): Observable<ResponseModel> {
    let newPath = this.apiURL + 'users/update'
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
}
