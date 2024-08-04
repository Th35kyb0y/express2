import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CsOrderDetailsPopUpComponent } from 'src/app/model-popups/cs/cs-new/cs-order-details-pop-up/cs-order-details-pop-up.component';
import { OrderItem } from 'src/app/models/order/order-detail';
import { ApiService } from 'src/app/services/api.service';
import { CSModelService } from 'src/app/view/cs/cs-model.service';

@Component({
  selector: 'app-cs-placed-orders',
  templateUrl: './cs-placed-orders.component.html',
  styleUrls: ['./cs-placed-orders.component.scss']
})
export class CsPlacedOrdersComponent {
 obj={
  todate:'',
  fromdate:'',
  status:'2',
  UserId:'',
  flag:'',
  EmpCode:''
 }
 OrderList:any=[];
  constructor(private router: Router,public ApiService: ApiService,
    public csModelService:CSModelService,
    private modalService: NgbModal,

  ) { }
 ngOnInit(): void {


   this.getCSDashLastOrder();
 
 }

  getCSDashLastOrder(){
   
    this.obj.EmpCode  = this.ApiService.getCSEmpCode()
    this.ApiService.httpost(this.obj,'/OrderMaster/get_CS_User_Placed_Orders')
    .subscribe((res:any)=>{
      this.OrderList =  res.data;
    })

    }
    public bindQuantity(orderItem: OrderItem[]) {
      let qtn = 0;
      orderItem.forEach((item: OrderItem) => {
        qtn = item.quantity + qtn;
      });
      return "Qty: " + qtn;
    }

    ViewOrder(item:any){
      debugger
      const modalRef = this.modalService.open(CsOrderDetailsPopUpComponent, {
        size: "xl",
        centered: true,
        fullscreen: true,
        //windowClass: 'xlModal-100'
      });
      modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
        
        if (receivedEntry) {
          this.getCSDashLastOrder();
        }
  
      })

      modalRef.componentInstance.item = item;
      modalRef.componentInstance.orderId = item.orderId;
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with:', result);
        },
        (reason) => {
          console.log('Modal dismissed with:', reason);
        }
      );
    }
}
