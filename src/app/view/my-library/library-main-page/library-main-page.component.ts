import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-library-main-page',
  templateUrl: './library-main-page.component.html',
  styleUrls: ['./library-main-page.component.scss']
})
export class LibraryMainPageComponent {
  constructor(
    public apiService:ApiService) {

  }
  get isShowCSHomeBtn(){
    return this.apiService.getCSEmpCode();

  }

}
