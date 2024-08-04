import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-project-follow-up-add',
  templateUrl: './project-follow-up-add.component.html',
  styleUrls: ['./project-follow-up-add.component.scss'],
})
export class ProjectFollowUpAddComponent implements OnInit, OnChanges {
  @Input() ProjectId: any = '';

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  followUp: FormGroup = this.formBuilder.group({
    ProjectId: 0,
    FollowUpDate: ['', Validators.required],
    StartTime: ['', Validators.required],
    EndTime: ['', Validators.required],
    FollowUpType: ['', Validators.required],
    SPANCO: ['', Validators.required],
    NextFollowUpDate: [''],
    Remark: ['', Validators.required],
    EmpCode: [''],
    Category1: '',
    Category2: '',
    Category3: '',

    Category_1Name: '',
    Category_2Name: '',
    Category_3Name: '',
    Sales_Pitch: '',
    Notes: '',
  });

  customerList: any = [];
  spancolist: any = [];

  options1: any = [];
  options2: any = [];
  options3: any = [];

  id: number = 0;
  isFieldInvalid(field: string): boolean {
    const control = this.followUp.get(field);
    let res = control?.invalid && (control.dirty || control.touched);
    return res == null ? false : res;
  }

  get isShowCat() {
    if (this.followUp.value.SPANCO == 'Presentation') {
      return true;
    }
    return false;
  }

  constructor(
    private formBuilder: FormBuilder,
    private ApiService: ApiService,
    private Toast: ToastService,
    public activeModal: NgbActiveModal
  ) {
    this.id = 0;
  }

  getCat2(id: number) {
    let Q = '&CategoryId1=' + id;
    this.ApiService.httpget(Q, '/Categories/getAllCategories2').subscribe(
      (response: any) => {
        this.options2 = response.data;
      },
      (err) => {}
    );
  }
  selectCat2(event: any) {
    // Handle the change event, e.g., log the selected option
    console.log('Selected Option:', event.target.value);
    if (event.target.value) {
      this.getCat2(event.target.value);
    }
  }

  getCat3(id: number) {
    let Q = '&CategoryId2=' + id;
    this.ApiService.httpget(Q, '/Categories/getAllCategories3').subscribe(
      (response: any) => {
        this.options3 = response.data;
      },
      (err) => {}
    );
  }

  selectCat3(event: any) {
    if (event.target.value) {
      this.getCat3(event.target.value);
    }
  }

  getCat1() {
    this.ApiService.httpget('', '/Categories/getAllCategories1').subscribe(
      (response: any) => {
        this.options1 = response.data;
      },
      (err) => {}
    );
  }

  closeModal(msg: any) {
    this.activeModal.dismiss(msg);
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    debugger;
    this.getCat1();
    this.followUp.patchValue({
      EmpCode: this.ApiService.getCSEmpCode(),
      ProjectId: this.ProjectId,
    });

    this.getSettings();
  }
  // getSettings() {
  //   let Q = '';
  //   this.ApiService.httpget(Q, '/Settings/getSpanco').subscribe(
  //     (response: any) => {
  //       this.spancolist = response.data;
  //       console.log('AAAAAAAAA', this.spancolist);
  //     },
  //     (err) => {}
  //   );
  // }

  //Ajay Yadav
  getSettings() {
    let Q = '';
    this.ApiService.httpget(Q, '/MenuMaster/getSpancoDropdown').subscribe(
     {
      next:(response:any)=>{
          this.spancolist = response.data;
          console.log('AAAAAAAAA', this.spancolist);
      },
      error:(error:Error)=>{
        console.log('Something Wrong', error)
      }
     }
    );
  }




  resetForm() {
    //this.followUp.reset(); // Reset values
    //this.followUp.markAsPristine(); // Clear dirty state
    //this.followUp.markAsUntouched(); // Clear touched state
  }

  saveFollowUp() {
    debugger;

    if (this.followUp.valid) {
      var Category_1Name = '',
        Category_2Name = '',
        Category_3Name = '';
      if (this.followUp.value.Category1) {
        let f = this.options1.filter(
          (x: any) => x.id == this.followUp.value.Category1
        );
        if (f.length > 0) {
          Category_1Name = f[0].name;
        }
      }
      if (this.followUp.value.Category2) {
        let f = this.options2.filter(
          (x: any) => x.id == this.followUp.value.Category2
        );
        if (f.length > 0) {
          Category_2Name = f[0].name;
        }
      }
      if (this.followUp.value.Category3) {
        let f = this.options3.filter(
          (x: any) => x.id == this.followUp.value.Category3
        );
        if (f.length > 0) {
          Category_3Name = f[0].name;
        }
      }

      this.followUp.patchValue({
        Category_1Name: Category_1Name,
        Category_2Name: Category_2Name,
        Category_3Name: Category_3Name,
      });

      let script = '/UserMaster/ProjectFollowUpAdd';
      // if(this.addressId=='Edit'){
      //    script = "/AddressMaster/update";
      // }

      this.ApiService.httpost(
        {
          ...this.followUp.value,
        },
        script
      ).subscribe(
        (response: any) => {
          debugger;
          if (response.isSuccess) {
            this.Toast.showToast(response.message, ToastType.Success);
            this.resetForm();
            this.passEntry.emit('refresh');
            this.activeModal.dismiss('');
          } else {
            this.Toast.showToast(response.message, ToastType.Error);
          }
        },
        (err) => {
          this.Toast.showToast(err.Message, ToastType.Error);
        }
      );
    } else {
      // Form is invalid, highlight the fields
      this.followUp.markAllAsTouched();
    }
  }
}
