import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  rememberMe: boolean = false;
 
 
  
  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router:Router,
  
   ) { }

  ngOnInit(): void {
    this.createRegisterForm();
   
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
         
    })
  }
  register(){
    if(this.registerForm.valid){
      let newUser = Object.assign({},this.registerForm.value);
      this.authService.register(newUser).subscribe(response=>{
      this.localStorageService.add("token", response.data.token);           
      this.toastrService.success("Tebrikler! Kayıt olundu.");      
      this.router.navigate([""]);      
      if (this.rememberMe) {
        this.saveEmail(newUser.email);
      }
      },responseError=>{    
        this.toastrService.error(responseError.error,"Kayıt başarısız!");
               
      })
    }
  }  
  
  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }

}
