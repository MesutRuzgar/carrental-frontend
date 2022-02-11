import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLoggedIn:boolean = false
  
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.setUserLoggedIn();
  }

  setUserLoggedIn() {
    this.userLoggedIn = this.authService.isAuthenticated()
  }

}
