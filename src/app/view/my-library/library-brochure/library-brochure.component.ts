import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-library-brochure',
  templateUrl: './library-brochure.component.html',
  styleUrls: ['./library-brochure.component.scss']
})
export class LibraryBrochureComponent {


  ContentTypeId:any
  name:string=''
  constructor( private router:Router,private route:ActivatedRoute){
this.route.queryParams.subscribe((params:any)=>{
  console.log("Query data is", params)

  this.ContentTypeId=params?.ContentTypeId
  this.name=params?.name

})
  }


  routeToProductSubcategory(CollectionId:any){
    console.log('LLLLLLLLLLLLLlll')
this.router.navigate(['myLibrary/productSubcategory'],{queryParams:{ContentTypeId:this.ContentTypeId,CollectionId:CollectionId}})
  }
}
