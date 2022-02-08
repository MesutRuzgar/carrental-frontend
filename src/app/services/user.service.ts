import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModule';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:44322/api/";
  constructor(private httpClient: HttpClient) { }

  updateProfile(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/update'
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
  getById(userId:number):Observable<SingleResponseModel<User>>{
    let newPath= this.apiUrl+"users/getbyid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
