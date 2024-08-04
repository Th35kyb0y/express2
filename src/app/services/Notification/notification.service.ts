import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationData:any[]=[];
  constructor(public ApiService: ApiService) { }
  getNotification(): Observable<any[]> {
    const query = `&Code=${this.ApiService.getUserId()?.toString()}`;
    return this.ApiService.httpgetMaster(query, "/Proposal/getNotification").pipe(
      map((response: any) => {
        if (response && response.data) {
          localStorage.setItem('notification_data', JSON.stringify(response.data.filter((p: { readReceipt: number; })=>p.readReceipt==1)));
          return response.data;
        } else {
          throw new Error('Invalid response format'); // Throw an error if data is missing
        }
      })
    );
  }
  

  saveNotification(notification: any): Observable<any> {
    return this.ApiService.httpost(notification, '/Proposal/saveNotification');
  }

  totalNotification() {
    let total = 0;
    this.notificationData= this.getItem('notification_data');
    total +=this.notificationData.length;
    return total;
  };

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }
}
