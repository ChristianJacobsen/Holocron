import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ToastModule, ToastOptions } from "ng2-toastr";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RoomComponent } from "./room/room.component";
import { RoomlistComponent } from "./roomlist/roomlist.component";

import { ChatService } from "./chat.service";

import "hammerjs";
import "ng2-toastr";

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
            },
            {
                path: "rooms/:id",
                component: RoomComponent
            }
        ]),
        MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [ChatService],
    bootstrap: [AppComponent]
})
export class AppModule { }
