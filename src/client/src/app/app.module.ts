import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';
import { RoomlistComponent } from './roomlist/roomlist.component';

import { ChatService } from "./chat.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RoomComponent,
        RoomlistComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "rooms",
                component: RoomlistComponent
            }
        ])
    ],
    providers: [ChatService],
    bootstrap: [AppComponent]
})
export class AppModule { }
