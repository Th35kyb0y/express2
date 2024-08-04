import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ONResize_PlatformService } from 'src/app/services/onResize-platform.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isMobile: boolean =  false;
	width: number = 0;
	@HostListener('window:resize', ['$event'])
    onResize(event:any) {
      
      this.width = event.target.innerWidth;
      this.isMobile = this.width < 992;
    } 
  constructor(private router: Router,public onResize_PlatformService:ONResize_PlatformService) { 

    try{

			this.width = window.innerWidth;
			this.isMobile = this.width < 992;
	  
		  }catch(e){}
  }
  logout(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
      //this.router.navigate(['.'], { queryParams: { reload: true } });
      
      window.location.reload()
    }, 100);
  
  }
}
