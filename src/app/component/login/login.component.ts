import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator,FormBuilder, Validators  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  rememberMe: boolean = false;
  loggingIn:boolean = false;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService: LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm= this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){  
      this.loggingIn = true
      let user= Object.assign({},this.loginForm.value)      
      this.authService.login(user).subscribe(response=>{        
        this.toastrService.success("Giriş Yapıldı")
        this.localStorageService.add("token",response.data.token);
         this.router.navigate([""]);
         setTimeout(() => {
          window.location.reload();
        }, 100);
        if (this.rememberMe) {
          this.saveEmail(user.email);
        }
      },responseError=>{    
        this.toastrService.error(responseError.error);        
      });
      
      this.loggingIn = false
    }
  }
  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }

}
