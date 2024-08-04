import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-cs-header',
  templateUrl: './cs-header.component.html',
  styleUrls: ['./cs-header.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ],
  
})
export class CsHeaderComponent {
  @Input('title') title:string=''

  @Input('isNotFromMailer') isNotFromMailer:boolean=true

  constructor(
    private router:Router,
    public ApiService: ApiService ,
  ){}

  logout() {
		window.localStorage.clear();
		window.sessionStorage.clear();
		this.router.navigate(['/']);
		setTimeout(() => {
	  
		  window.location.reload()
		}, 100);
	  }

    
}
