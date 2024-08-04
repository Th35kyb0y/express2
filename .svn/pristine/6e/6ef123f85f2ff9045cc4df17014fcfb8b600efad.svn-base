import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/model-popups/validation';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  changePasswordForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    private ApiService:ApiService,
    ) {
		
    }
    ngOnInit(): void {
      let  profile:any=  null;
     profile = ApiService.getProfile();
   

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

    onSubmit(): void {
      this.submitted = true;
  
      if (this.changePasswordForm.invalid) {
        return;
      }else{
      this.ApiService.httpost(this.changePasswordForm.value, "/UserMaster/changePassword").subscribe(
        (response: any) => {
         debugger
          alert(response.message);
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
