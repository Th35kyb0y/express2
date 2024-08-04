import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderItem } from 'src/app/models/order/order-detail';
import { ApiService } from 'src/app/services/api.service';
import Chart from 'chart.js/auto';
import { CSModelService } from '../../cs/cs-model.service';
@Component({
  selector: 'app-customer-support-home',
  templateUrl: './customer-support-home.component.html',
  styleUrls: ['./customer-support-home.component.scss',
	'../../../../assets/CS/cs-new.scss'
  ],
})
export class CustomerSupportHomeComponent {
	public topOrderList: Order[] = [];
	result:any={};
	linechart: any;
  constructor(private router: Router,public ApiService: ApiService,public csModelService:CSModelService,

   ) { }
  ngOnInit(): void {

		this.getCSDashBoardCounter();
		this.getCSDashLastOrder();
		this.getChartAPI();
		//this.CreateLineChart();
	}

	CreateLineChart(orders:any){
		
		var dates;
		var amounts
		if(orders.length>0){
			dates = orders.map((order:any) => order.date);
			amounts = orders.map((order:any) => order.amount);
		}else{
			dates= ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
			amounts = [0, 0, 0, 0, 0, 0, 0]
		}
		
		this.linechart = new Chart('linecanvas', {
			type: 'line',
			data: {
			  labels: dates,
			  datasets: [{
				label: 'Orders Amount',
				data: amounts,
				borderColor: 'rgb(75, 192, 192)',
				fill: false
			  }]
			},
			options: {
			  responsive: true,
			  maintainAspectRatio: false,
			  scales: {
				x: {
				  display: true,
				  title: {
					display: true,
					text: 'Month'
				  }
				},
				y: {
				  display: true,
				  title: {
					display: true,
					text: 'Value'
				  }
				}
			  }
			}
		  });
	}


  gotoPage(pgname:string){
		this.router.navigateByUrl('/cs/'+pgname)
  }

  getCSDashBoardCounter(){
	let Q ="&EmpCode="+this.ApiService.getCSEmpCode();
	this.ApiService.httpget(Q,'/UserMaster/Get-CS-DashBoard-Counter')
	.subscribe((res:any)=>{
		
		var data  =  JSON.parse(res.data)
		this.result =  data[0];
	
	})
  }

  getCSDashLastOrder(){
	let Q ="&EmpCode="+this.ApiService.getCSEmpCode();
	this.ApiService.httpget(Q,'/OrderMaster/dashBoardLast5Order')
	.subscribe((res:any)=>{
		this.topOrderList =  res.data;
	})
  }
  getChartAPI(){
	let Q ="&EmpCode="+this.ApiService.getCSEmpCode();
	this.ApiService.httpget(Q,'/OrderMaster/dashBoardOrderLineChart')
	.subscribe((res:any)=>{
		
		let data = JSON.parse(res.data);
		this.CreateLineChart(data);
	})

	 let q = '&EmpCode='+this.ApiService.getCSEmpCode()+'&flag=Graph'
  this.ApiService.httpget(q, '/UserMaster/CSAssignEnquiryStatusFromSMP').subscribe(
    (response: any) => {
    
    if (response.isSuccess) {
      let data:any = JSON.parse(response.data.response);
      if(data.length>0){
     
      }
     
    } else {

    }
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
}
