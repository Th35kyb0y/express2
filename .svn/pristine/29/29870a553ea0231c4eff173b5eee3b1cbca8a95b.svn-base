import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-designheader',
  templateUrl: './designheader.component.html',
  styleUrls: ['./designheader.component.scss'],
})
export class DesignheaderComponent implements OnInit {
  username: string = '';
  showLogout: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    // Retrieve user object from localStorage
    const userJson: any = this.apiService.getDEProfile();
    if (userJson) {
      this.username = userJson.firstName + ' ' + userJson.lastName;
    } else {
    }
  }

  toggleDropdown(): void {
    this.showLogout = !this.showLogout;
  }

  hideDropdown(): void {
    // Hide the dropdown only if it's not clicked
    if (!this.showLogout) {
      this.showLogout = false;
    }
  }
  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
