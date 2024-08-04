import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationEntity } from 'src/app/models/proposal/proposal';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Output() notificationEvent = new EventEmitter<any>();
  notifications:any[]=[];
  notification:NotificationEntity;
  constructor(public ApiService: ApiService,private router: Router, public notificationService: NotificationService) {
    this.notification = new NotificationEntity();
   }

  ngOnInit(): void {

		this.getNotification();
	  }

    getNotification() {
      this.notificationService.getNotification().subscribe(
        (data: any[]) => {
          this.notifications = data.filter(p=>p.readReceipt==1);
        },
        (err) => {
          console.error("Error fetching notifications:", err);
        }
      );
	  }
    saveNotification()
    {
      this.notificationService.saveNotification(this.notification).subscribe(
        (res: any) => {
          // Handle successful response
        },
        (error) => {
          // Handle error
        }
      );
    }

    async sendProposal(item: any) {
      item.readReceipt=false;
      this.notificationService.saveNotification(item).subscribe(
        (res: any) => {
          // Handle successful response
          this.notificationEvent.emit();
          this.getNotification();
          this.router.navigate(['/user/proposal', { proposalCode: item.caseId}]);
          
        },
        (error) => {
          // Handle error
        }
      );

    }

    goToNotification(){
      this.router.navigate(['/notifications']);
      this.notificationEvent.emit();
    }
}
