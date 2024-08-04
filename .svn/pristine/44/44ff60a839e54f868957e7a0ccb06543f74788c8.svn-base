import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import Validation from '../../validation';

@Component({
  selector: 'app-edit-profile-change-pwd',
  templateUrl: './edit-profile-change-pwd.component.html',
  styleUrls: ['./edit-profile-change-pwd.component.scss']
})
export class EditProfileChangePwdComponent implements OnInit {
  @Input() type: string='';
  // changePasswordForm: FormGroup =  this.formBuilder.group({
  //   oldPassword: ['', Validators.required],
  //   newPassword: ['', [Validators.required, Validators.minLength(6)]],
  //   confirmPassword: ['', Validators.required]
  // }, { validators: this.passwordsMatchValidator });

  changePasswordForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  //changePasswordForm: FormGroup;
  submitted = false;
  userProfile: FormGroup = this.formBuilder.group({
    id:0,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    mobile: [null, [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
    email: [null, [Validators.required, Validators.email]],
  }); 
  
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder, 
    private ApiService:ApiService) {
		
    }
    keyPress(event: any) {


      if (event.charCode !== 0) {
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
  
        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
      }
  
    }
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
  }
  ngOnInit(): void {
    let  profile:any=  null;
     profile = ApiService.getProfile();
    this.userProfile.patchValue({
      id: this.ApiService.getUserId(),
      firstName: profile.firstName,
      lastName:profile.lastName,
      mobile:profile.mobile,
      email:profile.email
    });

	this.changePasswordForm = this.formBuilder.group(
		{id:this.ApiService.getUserId(),
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
  updateProfile() {
    if (this.userProfile.valid) {
      
    this.ApiService.httpost(this.userProfile.value, "/UserMaster/updateProfile").subscribe(
      (response: any) => {
        if(response.isSuccess){
          localStorage.setItem("profile",JSON.stringify(response.data));
          this.closeModal('Dismissed')
        }
        alert(response.message);
      },
      (err) => {
      }
    );
    }
    else {
      // Mark the form controls as touched to display validation messages
      this.userProfile.markAllAsTouched();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }else{
		this.ApiService.httpost(this.changePasswordForm.value, "/UserMaster/changePassword").subscribe(
			(response: any) => {
			 
			  alert(response.message);
        this.closeModal('Dismissed')
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
