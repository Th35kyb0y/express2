import { HostListener, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ONResize_PlatformService {
    @HostListener('window:resize', ['$event'])
    width:number=0;
   
    onResize(event:any) {
      //console.log(" event.target.innerWidth"+ event.target.innerWidth)
      this.width = event.target.innerWidth;
      //this.isMobile = this.width < 992;
    }
 
    constructor() { }

    private isTablet(): boolean {
      return /iPad|Tablet|PlayBook|Silk|Kindle|Android 3.0|SCH-I800|Nexus 7|Nexus 10|Xoom|SM-T|GT-P/.test(navigator.userAgent);
    }

    public get isMobile(){
      this.width = window.innerWidth;
      return this.width < 992 ||  this.isTablet();
    
    }

}
