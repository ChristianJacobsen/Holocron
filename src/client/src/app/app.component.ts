import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";

import { ChatService } from "./chat.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = "Holocron";

    constructor(
        private chatService: ChatService,
        private router: Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.chatService.getPrivateMessage().subscribe(msg => {
            this.toastr.info(
                msg.message,
                msg.fromUser);
        });
    }

    onHome() {
        if (this.chatService.getUsername() === undefined) {
            this.router.navigate(["/login"]);
        } else {
            this.router.navigate(["/rooms"]);
        }
    }
}
