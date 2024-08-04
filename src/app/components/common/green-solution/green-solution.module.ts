import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreenSolutionComponent } from './green-solution.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AppProductDetailsModule } from "../../../view/ApplicationArea/app-product-details/app.product-details.module";


const routes: Routes = [
  { path: '', component:GreenSolutionComponent},

];
@NgModule({
    declarations: [GreenSolutionComponent],
    exports: [GreenSolutionComponent],
    imports: [ 
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        AppProductDetailsModule
    ]
})
export class GreenSolutionModule { }
