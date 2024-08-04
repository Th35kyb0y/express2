import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-user-rating',
  templateUrl: './create-user-rating.component.html',
  styleUrls: ['./create-user-rating.component.scss']
})
export class CreateUserRatingComponent implements OnInit {
     @Input('item') item:any;
  
	postData:any={
		UserId:'',
		OrderNumber:'',
		questions:[],
		OtherRemarks:'',
		recommendCeasefire:'1'

	}
  questions: { id: number, text: string, rating: number }[] = [
    { id: 1, text: 'How happy are you with the interaction of our Sales Manager in your buying process ?', rating: 0 },
    { id: 2, text: 'How happy are you with the product proposal that was submitted to you ?', rating: 0 },
    { id: 3, text: 'How happy are you with the processing, dispatch, delivery & installation of your order ?', rating: 0 },
    { id: 4, text: 'Was the delivery person courteous enough ?', rating: 0 },
    { id: 5, text: 'How happy are you with the quality of the product ?', rating: 0 },
    { id: 6, text: 'How would you rate your overall experience with us ?', rating: 0 },
 
  ];
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    
    private ApiService:ApiService) {}
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
   
  }
  submitRatings() {
	
    console.log('User Ratings:', this.questions);
	this.postData.questions =  this.questions
	this.ApiService.httpost(this.postData, "/UserMaster/AddUserRating").subscribe(
		(response: any) => {
		 
			alert("Submited successfully")
			this.closeModal('');
		},
		(err) => {
		}
	  );
    // You can add logic here to send the ratings to a server
  }


  ngOnInit(): void {
    

	this.postData.UserId =   parseInt(this.ApiService.getUserId()+"");
	this.postData.OrderNumber =   this.item.orderNumber
    let item = this.item;

    let cc 
    
  }
}
