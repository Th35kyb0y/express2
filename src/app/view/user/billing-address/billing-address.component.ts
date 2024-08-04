import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from 'src/app/model-popups/user/add-address/add-address.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit {
  proposalCode:string='';

  addresses:any = [];
 
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,
    private ApiService: ApiService, private CommonService: CommonService,
    public cartService: CartService,
    private toastservice:ToastService,
    public route: ActivatedRoute,
    private router :Router) { 

      const sub = this.route.queryParams
      .subscribe(params => {
        this.proposalCode = params['proposalCode']
      })

    }

  ngOnInit(): void {
  
    this.getAddressMaster();
  }


  addAddress(isEdit:string,obj:any){
    
    const modalRef = this.modalService.open(AddAddressComponent, {
      size: "dialog-centered",
      centered: true,
      windowClass: 'xlModal'
    });
   
    modalRef.componentInstance.type = isEdit;
    modalRef.componentInstance.obj = obj;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
      if(receivedEntry){
        this.getAddressMaster();
      }
        
        })
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  

  saveBillAdd(item:any){
    this.CommonService.saveBillAdd(item);
  }

  selBillAdd(item:any){
    const address = this.CommonService.getBillAdd();
    if(!address){return false}
    return ([address].find(e=>e.id == item.id))?true:false;
  }


  onInputChange(item:any) {
    // Do something with the updated input text
    let _billingAddress = this.CommonService.getBillAdd();
    if(_billingAddress){
      _billingAddress.deliveryInstruction =  item.deliveryInstruction;
      this.saveBillAdd(_billingAddress)
    }
  }

  getAddressMaster() {
    let Q =  '&userID='+this.ApiService.getUserId()
    this.ApiService.httpget(Q, "/AddressMaster/getUserAddresses").subscribe(
      (response: any) => {
        if(response.data.length==1){
          this.saveBillAdd(response.data[0])
        }
        this.addresses = response.data;
      },
      (err) => {
      }
    );
    // this.ApiService.httpget(``, "/AddressMaster/getAll").subscribe(
    //   (response: any) => {
    //     this.addresses = response.data;
    //   },
    //   (err) => {
    //   }
    // );
  }

  gotoToProcessOrder(){
    debugger
   
      if(this.CommonService.getBillAdd()){
        if(this.proposalCode){
          this.router.navigateByUrl('/user/order-summary-bycart?proposalCode='+this.proposalCode); 
        }else{
          this.router.navigateByUrl('/user/order-summary-bycart'); 
        }
        //this.router.navigateByUrl('/user/order-summary-bycart');      
      }
      else{
        this.toastservice.showToast('Please select address',ToastType.Error)
      }
    }

 

 
}

