import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ChatService } from "../chat.service";

@Component({
    selector: "app-room",
    templateUrl: "./room.component.html",
    styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit {

    id: string;
    messages: any[] = [];
    scroll: boolean;
    chatBox: HTMLElement;
    messageBox: HTMLTextAreaElement;

    constructor(private chatService: ChatService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.route.snapshot.params["id"];
        this.chatBox = document.getElementById("chatBox");
        this.chatBox.addEventListener("DOMSubtreeModified", this.checkScroll, false);

        /* We encountered an odd problem that we could not figure out.
         * When using the [(ngModel)] on a variable in this component
         * every time the variable changed, the ngFor loop in the HTML
         * would execute.
         * We tried using a ngForm, #name and trackBy on the ngFor, same
         * results.
         * We ended up using a hacky DOM-based solution. Get the messageBox
         * by ID and interacting with it that way.
         */
        this.messageBox = <HTMLTextAreaElement>document.getElementById("messageBox");

        this.chatService.getMessages(this.id).subscribe(messages => {
            if (this.messages.length !== messages.length) {
                this.scroll = (this.chatBox.scrollTop - 1) === (this.chatBox.scrollHeight - this.chatBox.offsetHeight);

                this.messages = messages;
            }
        });
    }

    checkScroll() {
        console.log("CHANGE");
        if (this.scroll) {
            console.log("SCROLLING " + new Date());
            this.chatBox.scrollTop = this.chatBox.scrollHeight - this.chatBox.clientHeight;
        }
    }

    getDate() {
        return new Date();
    }

    onSubmit() {
        if (this.messageBox.value === "") {
            return;
        }

        this.chatService.sendMessage(this.id, this.messageBox.value);

        this.messageBox.value = "";
    }
}
