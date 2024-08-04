import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cs-user-followp-history',
  templateUrl: './cs-user-followp-history.component.html',
  styleUrls: ['./cs-user-followp-history.component.scss']
})
export class CSUserFollowpHistoryComponent implements OnInit, OnChanges {
  @Input() UserId: any = '';

  followuplist: any = [];
  constructor(
    private ApiService: ApiService,
    private Toast: ToastService
  ) {

 

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getContact()
  }
  ngOnInit(): void {
  }

  getContact() {
    let Q = '&UserId=' + this.UserId
    this.ApiService.httpget(Q, '/UserMaster/GetUserFollowUp').subscribe(
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
