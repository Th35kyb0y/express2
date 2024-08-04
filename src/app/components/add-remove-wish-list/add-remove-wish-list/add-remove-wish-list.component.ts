import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-remove-wish-list',
  templateUrl: './add-remove-wish-list.component.html',
  styleUrls: ['./add-remove-wish-list.component.scss']
})
export class AddRemoveWishListComponent implements OnChanges {
@Input('item') item:any
  constructor(
    private _router: Router,
    public cartService: CartService,
    private modalService: NgbModal,
    private ApiService: ApiService

  ){

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  addRemoveWishlist(item:any){
	if(!item.isWishList){
		item.isWishList =  false;
	}
    if(this.isLoggedIn()){
		//item.IsWishList = !item.IsWishList;
      this.addOrRemove(item);
    }
    else{
      this.logIn('Log in',item)
    }
  }

  

  isLoggedIn(){
    return this.ApiService.getUserId();
  }
  logIn(type:string,item:any){
    const modalRef = this.modalService.open(LoginSignUoModelComponent, {
      size: 'lg', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        if(this.isLoggedIn()){
          this.addOrRemove(item);
        }
        console.log('Modal closed with:', result);
      },
      (reason) => {
        if(this.isLoggedIn()){
          this.addOrRemove(item);
        }
        console.log('Modal dismissed with:', reason);
      }
    );
  }

  	addOrRemove(item:any){
		debugger
		item.isWishList = !item.isWishList;
		let Q='&UserID='+this.ApiService.getUserId()+'&ProductID='+item.id
		this.ApiService.httpget(Q,'/ProductWishlist/UserAddRemoveWishProduct')
		.subscribe((res:any)=>{
			debugger

		})
  	}

}
