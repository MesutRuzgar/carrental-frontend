import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brands';
import { ResponseModel } from '../models/responseModule';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44322/api/"

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand)
  }
  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'brands/delete'
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

  update(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'brands/update'
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }
}
