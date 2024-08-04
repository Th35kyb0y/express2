import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-csheader',
  templateUrl: './csheader.component.html',
  styleUrls: ['./csheader.component.scss']
})
export class CSHeaderComponent {
  constructor(private router: Router,public apiService: ApiService, ) { }
  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
  
      window.location.reload()
    }, 100);
  }
}
