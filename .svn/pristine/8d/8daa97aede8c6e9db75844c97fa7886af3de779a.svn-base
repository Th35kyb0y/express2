import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from 'src/app/model-popups/validation';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent  implements OnInit{
  _token:string ='';
  Message:string='';
  isShowMessage:boolean=false;
  submitted = false;
  resetPasswordForm: FormGroup = new FormGroup({
    token: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  constructor(private route: ActivatedRoute,private ApiService: ApiService,
    private router:Router,
    private formBuilder: FormBuilder,
  ){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      
      this._token = params['token'];
      if(this._token){
        this.validateToken();
      }else{
        this.router.navigateByUrl("/")
      }

  });

  this.resetPasswordForm = this.formBuilder.group(
    {token:this._token,
     
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

    if (this.resetPasswordForm.invalid) {
      return;
    }else{
    this.ApiService.httpost(this.resetPasswordForm.value, "/UserMaster/user-resetPassword").subscribe(
      (response: any) => {
       

        alert(response.message);
        //this.resetPasswordForm.reset();
        if(response.isSuccess){
          this.router.navigateByUrl('/');
        }
       
      },
      (err) => {
      }
      );
  }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  validateToken(){
 
    
   
    let q =  {token:this._token}
    this.ApiService.httpost(q,'/UserMaster/ResetPasswordTokenValidate')
    .subscribe((res:any)=>{
      
      this.Message = res.Message;
        if(res.isSuccess){
          this.isShowMessage = false;
        }else{
         this.isShowMessage = true;
        }
    })
  }
}
