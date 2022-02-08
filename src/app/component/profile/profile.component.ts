import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserForLogin;
  updateProfileForm: FormGroup;
  updateCompanyForm: FormGroup;
  users:User;
  customers:Customer;

  constructor( 
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {   
    this.getByUser(); 
    this.getCustomerByUserId();  
    this.createUpdateProfileForm();
    this.createUpdateCompanyForm();
    this.currentUser = this.authService.getUser()!;
  }
  createUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email:["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }
  createUpdateCompanyForm(){
    this.updateCompanyForm=this.formBuilder.group({
      companyName:["",[Validators.required,Validators.minLength(5),Validators.maxLength(50)]]
    })
  }
  updateProfile() {
    if (this.updateProfileForm.valid) {     
      let user: User = Object.assign({}, this.updateProfileForm.value);
      user.id = this.currentUser.id;
      user.status=this.users.status;
      user.passwordHash=this.users.passwordHash;
      user.passwordSalt=this.users.passwordSalt;
      this.userService.updateProfile(user).subscribe((response) => {              
        this.toastrService.success("Lütfen tekrar giriş yapınız", "Profiliniz başarıyla güncellendi");
      
      }, errorResponse => {
       console.log(errorResponse)
        if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
          for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
            this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }       
        else {
          this.toastrService.error(errorResponse.error.message, "İşlem Sırasında Hata Oluştu.")
        }
      })
    } else {
      this.toastrService.error("Girilen bilgilerden en az birisi hatalı")
    }
  }

  updateCompany(){
    if(this.updateCompanyForm.valid){
      let NewCustomer:Customer=Object.assign({},this.updateCompanyForm.value);
      NewCustomer.userId=this.customers.userId;
      NewCustomer.id=this.customers.id;
      this.customerService.update(NewCustomer).subscribe(response=>{             
        this.toastrService.success("Bilgileriniz Başarıyla Güncellendi.")
      }, errorResponse => {
             console.log(errorResponse)
              if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
                for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
                  this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
                }
              }             
              else {
                this.toastrService.error(errorResponse.error.message, "İşlem Sırasında Hata Oluştu.")
              }
            })
          } else {            
            this.toastrService.error("Bilgileriniz Güncellenemedi.")
          }
        };
    
  
  getByUser(){
    let userId=this.authService.getUser().id;
    this.userService.getById(userId).subscribe(response=>{
      this.users=response.data;
      
    });
  }
  getCustomerByUserId(){
    let userId=this.authService.getUser().id;
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
      this.customers=response.data;      
    })
  }
  logOutAndGoLoginPage() {
    this.authService.logOut();
    this.router.navigate(["login"])
  }
  
  }
