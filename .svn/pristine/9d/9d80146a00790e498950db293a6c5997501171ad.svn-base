import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { restapiURL } from 'src/app/services/restapi-url';
@Component({
  selector: 'app-top-sidebar',
  templateUrl: './top-sidebar.component.html',
  styleUrls: ['./top-sidebar.component.scss']
})
export class TopSidebarComponent implements OnInit {

  showDiv1: boolean = false;
  data: any;
  account: any;

  constructor(private ApiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSegment();
  }

  getSegment() {
    this.ApiService.httpgetMaster("&Flag=Segment", restapiURL.segment).subscribe((response: any) => {
      this.data = response;
    },
      (err) => {
      }
    );
  }
}
