import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryPopupComponent } from 'src/app/model-popups/gallery-popup/gallery-popup.component';
import { CreateUserRatingComponent } from 'src/app/model-popups/rating/create-user-rating/create-user-rating.component';
import { Order, OrderItem } from 'src/app/models/order/order-detail';
import { OrderStatus } from 'src/app/models/order/order-status';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers:[DatePipe]
})
export class OrderComponent implements OnInit {
  obj:any={
    todate:'',fromdate:'',status:'',
    UserId:''
  }
  public orders: Order[] = [];
  public orderStatus: OrderStatus[] = [];
  constructor(
    private ApiService: ApiService,
    private cartService: CartService,
    private CommonService: CommonService,
    private datepipe:DatePipe,
    private _router: Router,
    private modalService: NgbModal,
    
  ) { }

  ngOnInit(): void {
    
    var currentDate = new Date();

// Subtract one year
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    this.obj.todate  =  this.datepipe.transform(new Date(),'yyyy-MM-dd');
    this.obj.fromdate  =  this.datepipe.transform(currentDate,'yyyy-MM-dd');
    this.obj.UserId =  parseInt(this.ApiService.getUserId()+"");
    console.log( this.obj.todate)
    this.getOrders();
    this.getStatus();
  }
  public goToSearch() {
    this.getOrders();
  }
  GoToGallery(items:any){
    return;
    let images:any  = [];
    items.forEach((e:any) => {
      images.push(e.productImage);
    });
    
    const modalRef = this.modalService.open(GalleryPopupComponent, {
      size: 'lg', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.images = images;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
       
      },
      (reason) => {
      
      }
    );
  }

  

  public editOrder(order: any) {
    // this.IsLoader = true;
    // this._orderService.editOrder(order.orderId).subscribe((response) => {
    //   this._cartService.updateHeaderCart();
    //   this._router.navigate(['./MyCart']);
    // });
    let Q = '&UserId='+this.ApiService.getUserId()+'&OrderId='+order.orderId
    this.ApiService.httpget(Q, `/OrderMaster/OrderAddInCart`).subscribe(
      (response: any) => {
        
        this.cartService.emptyCart();
        this.cartService.getUserCartsByAPI(this.ApiService.getUserId(),'').then((res)=>{
          setTimeout(() => {
            this._router.navigate(['./products/MyCart']);
          }, 1000);
        });
        
      },
      (err) => {
      }
    );
  }

  public bindQuantity(orderItem: OrderItem[]) {
    let qtn = 0;
    orderItem.forEach((item: OrderItem) => {
      qtn = item.quantity + qtn;
    });
    return "Qty: " + qtn;
  }

  public goDetail(order: Order) {
    
    this._router.navigate(['./user/order/order-details'], { queryParams: { orderId: order.orderId } });
  }
  public bindStatus(order: any) {
    return order.status;
  }

  userRating(item:any){
    debugger
    const modalRef = this.modalService.open(CreateUserRatingComponent, {
      size: "xl",
      centered: true,
      fullscreen: false,
      //windowClass: 'xlModal-100'
    });

    modalRef.componentInstance.item = item;
 
    debugger
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  getOrders() {

    this.ApiService.httpost(this.obj, `/OrderMaster/get-User-Order`).subscribe(
      (response: any) => {
        
        //this.ordersBKP = response.data;
        this.orders = response.data
      },
      (err) => {
      }
    );
  }
  private getStatus() {
    this.ApiService.httpget("", `/Settings/GetAll`).subscribe(
      (response: any) => {
        
        this.orderStatus = response.data;
      },
      (err) => {
      }
    );
  }
}

