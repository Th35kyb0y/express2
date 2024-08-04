import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLogin: boolean = true;
  user:FormGroup = this.formBuilder.group({
    password: '',
    email: '',
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobile: ['', Validators.required],
    confirmpassword: ['', Validators.required],
    photo:[""],
    referCode:[""],
    isEmailVerified:[0],
    isMobileVerified:[0],
    forceLogout:[0],
    isActive:[1],
    createdOn:[(new Date()).toISOString()],
  });

  constructor(
    private formBuilder: FormBuilder,
    private ApiService:ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // if(this.user.value.email && this.user.value.password){
    //   this.ApiService.savetoken(this.user.value.email);
    //   this.ApiService.gotoURL('/user/profile');
    // }

    this.ApiService.httpost(this.user.value, "/UserMaster/Login").subscribe(
      (response: any) => {
        localStorage.setItem("userid",response.data.id);
        localStorage.setItem("profile",JSON.stringify(response.data));
        this.ApiService.gotoURL("/user/profile");
      },
      (err) => {
        alert('Enter correct user/password');
      }
    );
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

}

