import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";

import { ChatService } from "../chat.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    userName: string;

    constructor(
        private chatService: ChatService,
        private router: Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

    }

    onLogin() {
        this.chatService.login(this.userName).subscribe(succeeded => {
            if (succeeded) {
                this.router.navigate(["/rooms"]);
            } else {
                this.toastr.error(
                    "Username already taken!",
                    "Authentication error",
                    {
                        titleClass: "customToastr",
                        messageClass: "customToastr"
                    });
            }
        });
    }

}
