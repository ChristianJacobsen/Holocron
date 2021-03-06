import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
        private router: Router
    ) { }

    ngOnInit() {
    }

    onHome() {
        if (this.chatService.getUsername() === undefined) {
            this.router.navigate(["/login"]);
        } else {
            this.router.navigate(["/rooms"]);
        }
    }
}
