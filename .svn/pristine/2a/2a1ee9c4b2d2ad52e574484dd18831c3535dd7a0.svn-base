import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderItem } from 'src/app/models/order/order-detail';
import { OrderStatus } from 'src/app/models/order/order-status';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cs-order-reports',
  templateUrl: './cs-order-reports.component.html',
  styleUrls: ['./cs-order-reports.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ],
  providers:[DatePipe]
})
export class CsOrderReportsComponent implements OnInit {
  obj:any={
    todate:'',
    fromdate:'',
    status:'',
    UserId:'',
    flag:'',
    EmpCode:''
  } 
  Users:any=[];
  public orders: Order[] = [];
  public orderStatus: OrderStatus[] = [];
  constructor(
    private router:Router,
    public ApiService: ApiService,
    private datepipe:DatePipe,
    private cartService: CartService,
    private CartService :CartService, ){
    
  }

  getUserProfile(item: any) {
    return new Promise<string>((resolve, reject) => {
      let Q = "&UserId=" + item.userId
      this.ApiService.httpget(Q, "/UserMaster/getUserProfile").subscribe(
        (response: any) => {
          
          if (response.isSuccess) {

          }else{

          }
          resolve(response);

        },
        (err) => {
          reject(err)
        }
      );
    });

  }

  async  editOrder(order: any) {

    var data:any  =  await this.getUserProfile(order);
    if(data.isSuccess){
      localStorage.setItem("userid",data.data.id);
      localStorage.setItem("profile",JSON.stringify(data.data));
      await this.CartService.AddToCardByApi();
      this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')

      let Q = '&UserId='+this.ApiService.getUserId()+'&OrderId='+order.orderId
      this.ApiService.httpget(Q, `/OrderMaster/OrderAddInCart`).subscribe(
        (response: any) => {
          debugger
          this.cartService.emptyCart();
          this.cartService.getUserCartsByAPI(this.ApiService.getUserId(),'').then((res)=>{
            setTimeout(() => {
              this.router.navigate(['./products/MyCart']);
            }, 1000);
          });
          
        },
        (err) => {
        }
      );

    
    }

    
   
  }


  public bindStatus(order: any) {
    return order.status;
  }

  async goDetail(order: Order) {
    

    var data:any  =  await this.getUserProfile(order);
    if(data.isSuccess){
      localStorage.setItem("userid",data.data.id);
      localStorage.setItem("profile",JSON.stringify(data.data));
      await this.CartService.AddToCardByApi();
      this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
      setTimeout(() => {
        this.router.navigate(['./user/order/order-details'], { queryParams: { orderId: order.orderId } });
      }, 100);
    }

    
  }

  ngOnInit(): void {
    var currentDate = new Date();

    // Subtract one year
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        this.obj.todate  =  this.datepipe.transform(new Date(),'yyyy-MM-dd');
        this.obj.fromdate  =  this.datepipe.transform(currentDate,'yyyy-MM-dd');
    	this.obj.EmpCode =  this.ApiService.getCSEmpCode();
        this.getStatus();
		this.getOrders();
  }

  public goToSearch() {
    this.getOrders();
  }

  public bindQuantity(orderItem: OrderItem[]) {
    let qtn = 0;
    orderItem.forEach((item: OrderItem) => {
      qtn = item.quantity + qtn;
    });
    return "Qty: " + qtn;
  }
  getOrders() {
debugger
	if(this.obj.UserId=='' || this.obj.UserId=='0'){
		this.obj.flag='All'
	}else{
		this.obj.flag == ''
	}

    this.ApiService.httpost(this.obj, `/OrderMaster/get_CS_User_Orders`).subscribe(
      (response: any) => {
        debugger
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
    this.ApiService.httpget("&EmpCode="+this.ApiService.getCSEmpCode(), `/UserMaster/getCSUserProfiles`).subscribe(
      (response: any) => {
        
        
        this.Users = response.data;
      },
      (err) => {
      }
    );
  }

  
}
