import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { ONResize_PlatformService } from 'src/app/services/onResize-platform.service';

export const StrongPasswordRegx: RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
@Component({
  selector: 'app-login-sign-uo-model',
  templateUrl: './login-sign-uo-model.component.html',
  styleUrls: ['./login-sign-uo-model.component.scss']
})
export class LoginSignUoModelComponent {
  @Input() type: string='';
  showLogin: boolean = true;
  showLoginPassword: boolean = false;
  showSignUpPassword: boolean = false;
  showConfirmPassword: boolean = false;
  userLogin: FormGroup = this.formBuilder.group({

   // email: [null, [Validators.required, Validators.email]],
    email: [null, [Validators.required]],
    password: [null, Validators.required],


  });
  userSignUp: FormGroup = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    mobile: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required//,Validators.pattern(StrongPasswordRegx)

    ],
    confirmpassword: [null, Validators.required],

    createdOn:[(new Date()).toISOString()],

  },{ validators: this.passwordMatchValidator });
  userForgotPassword: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private ApiService:ApiService,
    private router:Router,
    private CartService :CartService,
    public onResize_PlatformService:ONResize_PlatformService) {}
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
    // You can add any logic before closing the modal if needed
    //this.modalService.dismissAll();
    //this.modalService.dismissAll();
  }

  toggleLoginPasswordVisibility(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleSignUpPasswordVisibility(): void {
    this.showSignUpPassword = !this.showSignUpPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  onSubmit() {
    // if(this.user.value.email && this.user.value.password){
    //   this.ApiService.savetoken(this.user.value.email);
    //   this.ApiService.gotoURL('/user/profile');
    // }
    if (this.userLogin.valid) {
      this.ApiService.httpost(this.userLogin.value, "/UserMaster/LoginNew").subscribe(
        async ( response: any) => {
          debugger
          if(response.isSuccess){
            if(response.data.department=='CS' || response.data.department=='Admin'){
            this.ApiService.setCS(response.data.isCS);
            this.ApiService.setDepartment(response.data.department);
            this.ApiService.setCSEmpCode(response.data.empCode);
            this.ApiService.saveCSProfile(response.data);
            this.router.navigate(['/cs']);
            this.closeModal('Dismissed');

            }
            else if(response.data.department=='DE')
            {
              this.ApiService.setDE(response.data.isDE);
              this.ApiService.setDEEmpCode(response.data.empCode);
              this.ApiService.saveDEProfile(response.data);
              this.router.navigate(['/design']);
              this.closeModal('Dismissed');
            }
            else{
              localStorage.setItem("userid",response.data.id);
              localStorage.setItem("profile",JSON.stringify(response.data));
              await this.CartService.AddToCardByApi();
              this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
              this.router.navigate(['/customer-dashboard']);
            this.closeModal('Dismissed');
            }

          }else{
            alert(response.message);
          }

         // this.ApiService.gotoURL("/user/profile");
        },
        (err) => {
          alert('Enter correct user/password');
        }
      );
    } else {
      // Mark the form controls as touched to display validation messages
      this.userLogin.markAllAsTouched();
    }

  }
  isInvalid(controlName: string): boolean {
    const control = this.userSignUp.get(controlName);
    let isv = (control?.dirty && control?.invalid)?true:false;
    return isv;
  }
  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmpassword').value;

    return password === confirmPassword ? null : { mismatch: true };
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

  registerUser() {
    if (this.userSignUp.valid) {
    this.ApiService.httpost(this.userSignUp.value, "/UserMaster/userRegistration").subscribe(
      (response: any) => {
       

        if(response.isSuccess){
          this.type =  'SignUpMessage';
          localStorage.setItem("userid",response.data.id);
          localStorage.setItem("profile",JSON.stringify(response.data));
          //this.closeModal('Dismissed');
        }else{
          alert(response.message);
        }
        //this.ApiService.gotoURL("/login");
      },
      (err) => {
      }
    );
    }
    else {
      // Mark the form controls as touched to display validation messages
      this.userSignUp.markAllAsTouched();
    }
  }

  
  userForgotPasswordFunction() {
    

    if (this.userForgotPassword.valid) {
    this.ApiService.httpost(this.userForgotPassword.value, "/Email/UserForgotPassword").subscribe(
      (response: any) => {
        
        alert(response.message);
        if(response.isSuccess){
        this.closeModal('Dismissed');
        }
       
      },
      (err) => {
      }
    );
    }
    else {
      // Mark the form controls as touched to display validation messages
      this.userForgotPassword.markAllAsTouched();
    }
  }
}
