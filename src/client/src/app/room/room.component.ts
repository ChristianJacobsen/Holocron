import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ChatService } from "../chat.service";

@Component({
    selector: "app-room",
    templateUrl: "./room.component.html",
    styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit, OnDestroy {

    id: string;
    messages: any[] = [];
    users: any[];
    ops: any[];
    scroll: boolean;
    chatBox: HTMLElement;
    messageBox: HTMLTextAreaElement;
    userName: string;

    constructor(private chatService: ChatService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        if (this.chatService.getUsername() === undefined) {
            this.router.navigate(["/login"]);
        }

        this.userName = this.chatService.getUsername();
        this.id = this.route.snapshot.params["id"];
        this.chatBox = document.getElementById("chatBox");

        /* We encountered an odd problem that we could not figure out.
         * When using the [(ngModel)] on a variable in this component
         * every time the variable changed, the ngFor loop in the HTML
         * would execute.
         * We tried using a ngForm, #name and trackBy on the ngFor, same
         * results.
         * We ended up using a hacky DOM-based solution. Get the messageBox
         * by ID and interacting with it that way.
         * Also, ngFor updates on an exact 25 second interval, which is very
         * inefficient and strange.
         */
        this.messageBox = <HTMLTextAreaElement>document.getElementById("messageBox");

        this.chatService.getMessages(this.id).subscribe(messages => {
            if (this.messages.length !== messages.length) {
                this.scroll = (this.chatBox.scrollTop - 1) === (this.chatBox.scrollHeight - this.chatBox.offsetHeight);

                this.messages = messages;
            }
        });

        this.chatService.getUsers(this.id).subscribe(allUsers => {
            this.users = allUsers.users;
            this.ops = allUsers.ops;
        });
    }

    ngOnDestroy() {
        if (this.userName !== undefined) {
            this.chatService.leaveRoom(this.id);
        }
    }

    trackByFn(index, item) {
        return index;
    }

    checkScroll() {
        if (this.scroll) {
            this.chatBox.scrollTop = this.chatBox.scrollHeight - this.chatBox.clientHeight;
        }
    }

    onSubmit() {
        if (this.messageBox.value === "") {
            return;
        }

        this.chatService.sendMessage(this.id, this.messageBox.value);

        this.messageBox.value = "";
    }
}
