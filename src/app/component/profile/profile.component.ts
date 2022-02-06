import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: UserForLogin;
  updateProfileForm: FormGroup;
 

  constructor( 
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {      
    this.createUpdateProfileForm();
      this.currentUser = this.authService.getUser()!;
  }
  createUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email:["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }
  // updateProfile() {
  //   if (this.updateProfileForm.valid) {
      
     
  //     let user: User = Object.assign({}, this.updateProfileForm.value);
  //     user.id = this.currentUser.id;
  //     this.userService.updateProfile(user).subscribe((successResponse) => {
      
  //       this.toastrService.success("Bilgileriniz başarıyla güncellendi");
  //     }, errorResponse => {
  //      console.log(errorResponse)
  //       if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
  //         for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
  //           this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
  //         }
  //       }
       
  //       else {
  //         this.toastrService.error(errorResponse.error.message, "İşlem Sırasında Hata Oluştu.")
  //       }
  //     })
  //   } else {
  //     this.toastrService.error("Girilen bilgilerden en az birisi hatalı")
  //   }
  // }
  }
