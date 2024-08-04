import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: FormGroup = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    mobile: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    confirmpassword: [null, Validators.required],
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
    private ApiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit clicked');
    this.registerUser();
  }

  registerUser() {
    this.ApiService.httpost(this.user.value, "/UserMaster/save").subscribe(
      (response: any) => {
        alert(response.message);
        this.ApiService.gotoURL("/login");
      },
      (err) => {
      }
    );
  }

}
