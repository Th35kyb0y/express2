import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-notification-viewall',
  templateUrl: './notification-viewall.component.html',
  styleUrls: ['./notification-viewall.component.scss']
})
export class NotificationViewallComponent {
  notifications:any[]=[];
  constructor(private router: Router,public ApiService: ApiService, public notificationService: NotificationService) {
   }
  ngOnInit(): void {

		this.getNotification();
	  }

    getNotification() {
      this.notificationService.getNotification().subscribe(
        (data: any[]) => {
          this.notifications = data;
        },
        (err) => {
          console.error("Error fetching notifications:", err);
        }
      );
	  }

    async sendProposal(item: any) {
      this.router.navigate(['/user/proposal', { proposalCode: item.caseId}]);


    }
}
