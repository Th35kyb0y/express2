import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-project-follow-up-history',
  templateUrl: './project-follow-up-history.component.html',
  styleUrls: ['./project-follow-up-history.component.scss']
})
export class ProjectFollowUpHistoryComponent implements OnInit, OnChanges {
  @Input() ProjectId: any='';
  @Input() ProjectName: any='';
 
  followuplist: any = [];
  constructor(
    private ApiService: ApiService,
    private Toast: ToastService,
    public activeModal: NgbActiveModal,
  ) {



  }
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
  
  }
  ngOnChanges(changes: SimpleChanges): void {
  
  }
  ngOnInit(): void {
    this.getContact()
  }

  getContact() {
    debugger
    let Q = '&ProjectId=' + this.ProjectId
    this.ApiService.httpget(Q, '/UserMaster/GetUserFollowUpByProject').subscribe(
      (response: any) => {
        if (response.isSuccess) {
          let data = response.data;

          this.followuplist = data;
        } else {

        }
      },
      (err) => {

      }
    );
  }

}