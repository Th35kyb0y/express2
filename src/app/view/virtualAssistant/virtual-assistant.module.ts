import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualAssistantRoutingModule } from './virtual-assistant-routing.module';
import { VirtualAssistantComponent } from './virtual-assistant/virtual-assistant.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VirtualAssistantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VirtualAssistantRoutingModule
  ]
})
export class VirtualAssistantModule { }
