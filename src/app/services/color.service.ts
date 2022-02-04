import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModule';



@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44322/api/"

  constructor(private httpClient:HttpClient) {}

  getColors():Observable<ListResponseModel<Color>>{
   let newPath=this.apiUrl+"colors/getall"
   return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color)
  }
  delete(color: Color):Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/delete'
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/update'
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}
