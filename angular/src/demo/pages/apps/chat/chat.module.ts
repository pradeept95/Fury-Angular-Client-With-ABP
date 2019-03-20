import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MaterialModule } from '@shared/app-shared/material-components.module';
import { ScrollbarModule } from '@shared/app-shared/scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    MaterialModule,

    // Core
    ScrollbarModule,
  ],
  declarations: [ChatComponent]
})
export class ChatModule {
}
