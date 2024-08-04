import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/model-popups/validation';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { CSModelService } from 'src/app/view/cs/cs-model.service';

@Component({
  selector: 'app-cs-change-password',
  templateUrl: './cs-change-password.component.html',
  styleUrls: ['./cs-change-password.component.scss',
  '../../../../../assets/CS/cs-new.scss'

  ]
})
export class CsChangePasswordComponent implements OnInit {
  submitted = false;
  changePasswordForm: FormGroup = new FormGroup({
    EmpCode: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor(
    private router:Router,
    public ApiService: ApiService ,
    private _location: Location, 
    private toast:ToastService,
    private formBuilder: FormBuilder,
    public csModelService:CSModelService
){
    
  }
  ngOnInit(): void {
    //this.getRegistredUserWithFilter();
    this.changePasswordForm = this.formBuilder.group(
      {EmpCode:this.ApiService.getCSEmpCode(),
        currentPassword: ['', Validators.required],
       
        newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('newPassword', 'confirmPassword')],
      }
      );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }else{
    this.ApiService.httpost(this.changePasswordForm.value, "/UserMaster/cs-changePassword").subscribe(
      (response: any) => {
       debugger

        alert(response.message);
        //this.changePasswordForm.reset();
        if(response.isSuccess){
          this.ApiService.goCSDashBoard();
        }
       
      },
      (err) => {
      }
      );
  }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }


  
}
