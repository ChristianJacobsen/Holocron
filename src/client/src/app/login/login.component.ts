import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ChatService } from "../chat.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userName: string;
    loginFailed: boolean = false;

    constructor(
        private chatService: ChatService,
        private router: Router
    ) { }

    ngOnInit() {

    }

    onLogin() {
        this.chatService.login(this.userName).subscribe(succeeded => {
            this.loginFailed = !succeeded;
            if (succeeded === true) {
                this.router.navigate(["/rooms"]);
            }
        });
    }

}
