import { BrowserModule } from "@angular/platform-browser";
import { NgModule, enableProdMode } from "@angular/core";
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
import { NewPrivateMessageDialogComponent } from "./new-private-message-dialog/new-private-message-dialog.component";

import { ChatService } from "./chat.service";
import { DialogService } from "./dialog.service";

import "hammerjs";
import "ng2-toastr";

enableProdMode();

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RoomComponent,
        RoomlistComponent,
        NewPrivateMessageDialogComponent
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
        FlexLayoutModule,
        ToastModule.forRoot()
    ],
    providers: [
        ChatService,
        DialogService
    ],
    entryComponents: [
        NewPrivateMessageDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
