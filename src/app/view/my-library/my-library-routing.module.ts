import { LibraryBrochureComponent } from './library-brochure/library-brochure.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLibraryComponent } from './my-library/my-library.component';
import { LibraryMainPageComponent } from './library-main-page/library-main-page.component';
import { ProductSubcategoryListComponent } from './product-subcategory-list/product-subcategory-list.component';

const routes: Routes = [
  {path:'',component:LibraryMainPageComponent,
   children:[
     {path:'', component:MyLibraryComponent},
    {path:'brochure', component:LibraryBrochureComponent},
    {path:'productSubcategory', component:ProductSubcategoryListComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyLibraryRoutingModule { }
