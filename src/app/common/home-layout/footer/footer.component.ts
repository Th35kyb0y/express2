import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  bottomLink:any = [];
  contactUS = {
    address:"",
    contactNo:""
  };
  email: string = '';
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getContactUS();
    this.getBottomLink();
  }

  getContactUS() {
    this.ApiService.httpgetMaster("", "/ContactUS/getAll").subscribe(
      (response: any) => {
        this.contactUS = response.data[0];
      },
      (err) => {
      }
    );
  }
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  subscribe() {

    if(!this.email){
      alert('Email is required')
      return;
    }
    if(!this.emailPattern.test(this.email)){
      alert('Please enter valid emial')
      return;
    }
    let Q="&email="+this.email
    this.ApiService.httpgetMaster(Q, "/UserMaster/userSubscribe").subscribe(
      (response: any) => {
        if(response.isSuccess){
          this.email='';
        }
       alert(response.message);
      },
      (err) => {
      }
    );
  }

  getBottomLink() {
    
    this.ApiService.httpgetMaster("", "/BottomLink/getAll").subscribe(
      (response: any) => {
        this.bottomLink = response.data;
        this.bottomLink = this.bottomLink?.map((item:any) => {
          const catIdMatch = item.link.match(/catId=(\d+)/);
         let PageLink = item.link.split('?')[0]
          return {
              ...item,
              catId: catIdMatch ? parseInt(catIdMatch[1]) : 0,
              PageLink:PageLink
          };
      });
        

 
        console.log("Bottoemliknk", this.bottomLink)
      },
      (err) => {
      }
    );
  }
}
