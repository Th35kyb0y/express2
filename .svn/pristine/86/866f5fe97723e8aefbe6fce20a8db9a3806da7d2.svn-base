import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CSModelService } from 'src/app/view/cs/cs-model.service';

@Component({
  selector: 'app-cs-left-nav',
  templateUrl: './cs-left-nav.component.html',
  styleUrls: ['./cs-left-nav.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ]
})
export class CsLeftNavComponent {
  constructor(public ApiService: ApiService ,
    public csModelService:CSModelService,
    private router:Router,
  ){}
  toggleSidebar() {
    const sidebarElement = document.getElementById("sidebar");
    if (sidebarElement) {
      sidebarElement.classList.toggle('active');
    }
  }


  

  mini: boolean = true;


  toggleSidebar1() {
    const mySidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");

    if (mySidebar && main) {
      if (this.mini) {
        console.log("opening sidebar");
        mySidebar.style.width = "250px";
        //main.style.marginLeft = "250px";
        main.style.marginLeft = "200px";
        this.mini = false;
      } else {
        console.log("closing sidebar");
        mySidebar.style.width = "67px";
        //main.style.marginLeft = "67px";
        main.style.marginLeft = "0px";
        this.mini = true;
      }
    } else {
      console.error("Sidebar or main element not found.");
    }
  }
}
