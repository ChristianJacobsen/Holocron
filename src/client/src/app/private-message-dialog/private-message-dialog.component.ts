import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { ToastsManager } from "ng2-toastr";

import { ChatService } from "../chat.service";

@Component({
    selector: "app-private-message-dialog",
    templateUrl: "./private-message-dialog.component.html",
    styleUrls: ["./private-message-dialog.component.css"]
})
export class PrivateMessageDialogComponent implements OnInit {

    to: string;
    from: string;
    messages: any[] = [];
    message: string;
    chatBox: HTMLElement;

    constructor(
        private dialogRef: MdDialogRef<PrivateMessageDialogComponent>,
        private chatService: ChatService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.from = this.chatService.getUsername();
    }

    ngOnInit() {
        this.chatBox = document.getElementById("messages");

        this.chatService.getPrivateMessages(this.to).subscribe(messages => {
            if (this.messages.length !== messages.length) {
                this.messages = messages;
            }
        });
    }

    trackByFn(index, item) {
        return index;
    }

    scroll() {
        this.chatBox.scrollTop = this.chatBox.scrollHeight - this.chatBox.clientHeight;
    }

    onSend() {
        this.chatService.sendPrivateMessage(this.to, this.message).subscribe(succeeded => {
            if (succeeded) {
                this.message = "";
            } else {
                this.toastr.error(
                    "Unable to send message!",
                    "Error");
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
