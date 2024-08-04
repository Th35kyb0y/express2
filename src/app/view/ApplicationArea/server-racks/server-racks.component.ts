import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server-racks',
  templateUrl: './server-racks.component.html',
  styleUrls: ['./server-racks.component.scss']
})
export class ServerRacksComponent {
  Id:number=2017;
 constructor(public route: ActivatedRoute,){
  const sub = this.route.queryParams
  .subscribe(params => {
    
   
    if (params['id']) {
      this.Id = Number(params['id']);

    }
   
  })
 }
}
