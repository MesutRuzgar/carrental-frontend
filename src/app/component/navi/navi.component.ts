import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForLogin } from 'src/app/models/userForLogin';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  userLoggedIn:boolean = false
  
  currentUser: UserForLogin;
  constructor(
    private authService:AuthService,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.setUserLoggedIn();
    this.getCurrentUser();
   }
   
   setUserLoggedIn() {
    this.userLoggedIn = this.authService.isAuthenticated()
  }
  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }
  logOut() {
    this.authService.logOut();    
    this.toastrService.success("Hesabınızdan çıkış yapıldı", "Çıkış Başarılı");
    this.router.navigate([""]);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
