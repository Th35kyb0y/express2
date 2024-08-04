import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content, ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart-order-summery-by-product',
  templateUrl: './cart-order-summery-by-product.component.html',
  styleUrls: ['./cart-order-summery-by-product.component.scss']
})
export class CartOrderSummeryByProductComponent implements OnInit {
  @Input() orderId: string='';
  _productFirstImage:any=[];
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  private _OrderSummary : any =[];
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    
    private ApiService:ApiService) {}
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
    // You can add any logic before closing the modal if needed
    //this.modalService.dismissAll();
    //this.modalService.dismissAll();
  }

  get OrderSummary(){
    return this._OrderSummary;
  }
  ngOnInit(): void {

    if(!this.orderId){
      this.getOrderSummary('FullCart','No')
    }else{
      this.getOrderSummary('Product datails row wise',this.orderId)
    }
   
  }
  public getProductFirstImageContent(contents: Content[]): string {
		const images = contents.filter(function (content: Content) {
		  return content.contentTypeId === ContentType.Image && content.isMain == true;
		});
	
		if (images.length > 0) {
		  this._productFirstImage = images[0].link;
		}
		else {
		  this._productFirstImage = this._noProductImage;
		}
	
		return this._productFirstImage;
	  }
  getOrderSummary(flag:string,cart_id:string){
    debugger
    if(this.ApiService.getUserId()){
      let q =  '&userId='+this.ApiService.getUserId()+'&cart_id='+cart_id+'&Flag='+flag;
      this.ApiService.httpget(q,'/ProductCart/getCartOrderSummary')
      .subscribe((res:any)=>{
        
        this._OrderSummary= res;
        
      })
    }
  }
}
