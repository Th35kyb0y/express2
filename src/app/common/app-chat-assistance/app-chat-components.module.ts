import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppChatAssistanceComponent } from './app-chat-assistance.component';



@NgModule({
 imports:      [ CommonModule,FormsModule ],
 declarations: [ AppChatAssistanceComponent],
 exports:      [ AppChatAssistanceComponent ]
})
export class AppChatComponentModule { }
