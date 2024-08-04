import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent {
constructor( private router:Router){

}


  routeToProductCategory(ContentTypeId:any,name:string){
    console.log('LLLLLLLLLLLLLlll')
this.router.navigate(['myLibrary/brochure'],{queryParams:{ContentTypeId,name}})
  }
}
