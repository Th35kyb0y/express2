import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { DesignComponent } from './design.component';
import { AddBOQComponent } from './add-boq/add-boq.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { CSHeaderModule } from '../cs/csheader/csheader.module';
import { DesignheaderComponent } from './designheader/designheader.component';


@NgModule({
  declarations: [
    DesignComponent,
    AddBOQComponent,
    DesignheaderComponent
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    SharedModule,
    CSHeaderModule
  ],
  exports:[
    DesignheaderComponent
  ]
})
export class DesignModule { }
