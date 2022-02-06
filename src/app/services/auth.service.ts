import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserForLogin } from '../models/userForLogin';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl="https://localhost:44322/api/auth/"


  constructor(
    private httpClient:HttpClient,
    private jwtHelperService: JwtHelperService,
    private localStorageService: LocalStorageService) { }

    private isTokenExpired(): boolean {
      let token = this.getToken();
      if (token != null) {
        return !this.jwtHelperService.isTokenExpired(token);
      }
      return false;
    }
    private getToken(): string | null {
      return this.localStorageService.getItem("token");
    }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  logOut() {
    this.localStorageService.remove("token");
    
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }  

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }
  getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelperService.decodeToken(token));
      let user: UserForLogin = new UserForLogin;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.name = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(detail[1]);
          }
        }
      });
      if (!user.roles) {  //if the user does not have a role
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }
  

}