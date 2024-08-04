import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  baseurl: string = environment.baseURL_UI

  constructor(private ApiService: ApiService,private router: Router) {

     }


     items:any[]=[]
  ngOnInit(): void {
   this.customerDashboardData(2)

  }

  customerDashboardData(id:number){
		let Q ='&CategoryId1='+id
		this.ApiService.httpget(Q, "/CustomerDashboard/getAll").subscribe({
      next:(res:any)=>{
        this.items=res.data
      
      },
      error:(error:Error)=>{
      console.log("Something Wrong",error)
      }
    })

	}

  clickFunction(item:any){

    if(item.name.toLowerCase()=='logout'){
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.router.navigate(['/']);
      setTimeout(() => {
        //this.router.navigate(['.'], { queryParams: { reload: true } });
        
        window.location.reload()
      }, 100);
    }
   
  }
}
