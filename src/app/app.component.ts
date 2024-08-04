import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from './services/api.service';
import { CartService } from './services/CartService';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { register } from 'swiper/element/bundle'
import { MetatagsService } from './services/metatags.service';
import { ONResize_PlatformService } from './services/onResize-platform.service';
declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'ceasefire-express-web-app';
  constructor(
    public apiService:ApiService,
    private CartService:CartService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private meta :MetatagsService,
  public onResize_PlatformService:ONResize_PlatformService) {

      register()
    }

    Design:any
    ngOnInit(): void {

      // localStorage.setItem("chat","true");
      //  this.Design=sessionStorage.getItem('Design')
      // const script = this.renderer.createElement('script');
      // script.type = 'text/javascript';
      // script.src = 'https://in.fw-cdn.com/31451359/711366.js';
      // //script.src = 'https://fw-cdn.com/31451359/711366.js';
      // script.chat = true;
      // script.id = 'my-dynamic-script'; // Set an ID for easy removal
      // script.onload = () => {
      //   setTimeout(() => {

			// const userAgent = window.navigator.userAgent;
      //     let userInfo =  window.localStorage.getItem("profile");
      //     let id="";
      //     let firstName="";
      //     let email="";
		  // const browserName = this.detectBrowser(userAgent);
    	//  const browserVersion = this.detectBrowserVersion(userAgent);
    	// const browserPlatform = this.detectBrowserPlatform(userAgent);
      //     if(userInfo){
      //       try{
			// 	userInfo =  JSON.parse(userInfo);
			// 	id =  userInfo.id;
			// 	firstName =  userInfo.firstName;
			// 	email =  userInfo.email;
      //       }catch(e){
			// 	id =  browserVersion
			// 	firstName =  browserName
			// 	email =  browserPlatform
      //       }

      //     }else{
			// id =  browserVersion
			// 	firstName =  browserName
			// 	email =  browserPlatform
		  // }
      //         try{
      //           window.fcWidget.setExternalId(id);
      //           window.fcWidget.user.setFirstName(firstName);
      //           window.fcWidget.user.setEmail(email);
      //         }
      //         catch{

      //         }

      //   }, 500);

      // };
      // this.renderer.appendChild(document.body, script);

      this.getCartDetails();
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          
        let  idorcode = "";
          try{
            idorcode = this.router.url.split('?')[1] 
            if(idorcode){
              const array = idorcode.split('=');
              if(array.length>1){
                idorcode = array[1];
                let a_s = idorcode.split('&');
                idorcode = a_s[0];
              }
            }
          }catch(e){idorcode=""}
          try{
            let currentRoute = event.urlAfterRedirects; 
            let routeWithoutParams = currentRoute.split('?')[0].split(';')[0].split('/').filter(segment => !segment.startsWith(':')).join('/');
           let p = {
            url:routeWithoutParams,
            idorcode:idorcode
           }
            this.apiService.httpost(p,'/MetaTags/getMetaTag').subscribe((res:any)=>{
                           
                  if(res.isSuccess){
                    this.meta.AddMetatagDescription(res.data.description);
                    this.meta.AddMetatagKeywords(res.data.keywords);
                    this.meta.AddMetatagog_title(res.data.og_title);
                    this.meta.AddMetatagog_url(res.data.og_url);
                    this.meta.setTitle(res.data.page_title);


                  }
            })
          }
         catch(e){}
          window.scrollTo(0, 0); // Scroll to the top on route change
        }
      });
    }
    async getCartDetails(){
      if(localStorage.getItem("userid")){
        await this.CartService.AddToCardByApi();
			  await this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
      }
    }

	detectBrowser(userAgent: string): string {
		// Your logic to detect browser name
		// Example: return "Chrome" if userAgent contains "Chrome", otherwise return "Unknown"
		return userAgent.includes('Chrome') ? 'Chrome' : 'Unknown';
	  }

	  detectBrowserVersion(userAgent: string): string {
		// Your logic to detect browser version
		// Example: extract version from userAgent string
		return 'Version'; // Placeholder, replace with actual version detection logic
	  }

	  detectBrowserPlatform(userAgent: string): string {
		// Your logic to detect browser platform
		// Example: return "Windows" if userAgent contains "Windows", otherwise return "Unknown"
		return userAgent.includes('Windows') ? 'Windows' : 'Unknown';
	  }
}
