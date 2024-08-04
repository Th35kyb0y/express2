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
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  proposalCode:string='';
	addInstruction:any=[]
  addresses:any = [];

  isbillingAddressSame:boolean=false;


  constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
    private ApiService: ApiService, private CommonService: CommonService,
    public cartService: CartService,
    private toastservice:ToastService,
    private router :Router,
    public route: ActivatedRoute,) { 
      
      const sub = this.route.queryParams
      .subscribe(params => {
        
        this.proposalCode = params['proposalCode']
      })

    }

  // AddToProposalCart(){
  //   this.cartService.emptyCart();
  //   let Q = '&userId='+(this.ApiService.getUserId())+'&proposalCode='+this.proposalCode
  //   this.ApiService.httpget(Q,'/ProductCart/AddItemByProposal').subscribe((res:any)=>{
  //     this.cartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
  //     setTimeout(() => {
        
  //     }, 100);
  //   })
  // }

  ngOnInit(): void {
   
    this.getAddressMaster();
    // if(this.cartService.cartTotalItems()>0 && this.proposalCode){
    //   if(confirm('Product items already  added in cart. Do you want to remove it?')){
    //     this.ApiService.httpget('&userId='+(this.ApiService.getUserId()),'/ProductCart/removeUserCartItems').subscribe((res:any)=>{
          
    //       this.AddToProposalCart()
    //     })
    //   }
    //   else{
    //       this.AddToProposalCart()
    //   }
    // }else if(this.proposalCode){
    //   this.AddToProposalCart()
    // }
  }


  saveShipAdd(item:any){
    this.CommonService.saveShipAdd(item);
  }

  selShipAdd(item:any){
    const address = this.CommonService.getShipAdd();
    if(!address){return false}
    return ([address].find(e=>e.id == item.id))?true:false;
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

  setDetault(item:any,event: Event) {
 
    // Get the selected value from the event
    const selectedValue = (event.target as HTMLInputElement).value;
    let Q =  '&ID='+item.id+'&userId='+this.ApiService.getUserId()
    this.ApiService.httpget(Q, "/AddressMaster/setDefault").subscribe(
      (response: any) => {
        
        if(response.isSuccess){
          this.toastservice.showToast(response.message,ToastType.Success)
        }else{
          this.toastservice.showToast(response.message,ToastType.Error)
        }
        
      },
      (err) => {
        this.toastservice.showToast('Error occoured please try again later',ToastType.Error)
      }
    );
  }
  
  remove(item:any) {
    
    
    if(confirm('Are you sure?')){
      let Q =  '&ID='+item.id+'&userId='+this.ApiService.getUserId()
      this.ApiService.httpget(Q, "/AddressMaster/Delete").subscribe(
        (response: any) => {
          
          if(response.isSuccess){
            this.getAddressMaster();
            this.toastservice.showToast(response.message,ToastType.Success)
          }else{
            this.toastservice.showToast(response.message,ToastType.Error)
          }
        },
        (err) => {
        }
      );
    }
   
  }

  onInputChange(item:any) {
    // Do something with the updated input text
    let _shipingAddress = this.CommonService.getShipAdd();
    if(_shipingAddress){
		_shipingAddress.deliveryInstruction =  item.deliveryInstruction;
      this.saveShipAdd(_shipingAddress)
    }
  }
  getAddressMaster() {
    
    let Q =  '&userID='+this.ApiService.getUserId()
    this.ApiService.httpget(Q, "/AddressMaster/getUserAddresses").subscribe(
      (response: any) => {
        response.data.forEach((e:any) => {
			if(!e.IsEditInstruction){
				e.IsEditInstruction  =  false;
			}
			
		});
		if(response.data.length==1){
			this.saveShipAdd(response.data[0])
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


  gotoBining(){
	
	let isbillingAddressSame =  this.isbillingAddressSame;
	if(this.isbillingAddressSame){
		this.CommonService.saveBillAdd(this.CommonService.getShipAdd())
	}
    if(this.CommonService.getShipAdd()){
      if(this.proposalCode){
        this.router.navigateByUrl('/user/billing-address?proposalCode='+this.proposalCode); 
      }else{
        this.router.navigateByUrl('/user/billing-address'); 
      }
           
    }
    else{
      this.toastservice.showToast('Please select address',ToastType.Error)
    }
  }



}
