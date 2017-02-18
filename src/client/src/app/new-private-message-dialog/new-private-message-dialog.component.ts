import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { ToastsManager } from "ng2-toastr";

import { ChatService } from "../chat.service";

@Component({
    selector: "app-new-private-message-dialog",
    templateUrl: "./new-private-message-dialog.component.html",
    styleUrls: ["./new-private-message-dialog.component.css"]
})
export class NewPrivateMessageDialogComponent implements OnInit {

    user: string;
    message: string;

    constructor(
        private dialogRef: MdDialogRef<NewPrivateMessageDialogComponent>,
        private chatService: ChatService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    onSend() {
        this.chatService.sendPrivateMessage(this.user, this.message).subscribe(succeeded => {
            if (succeeded) {
                this.dialogRef.close(true);
            } else {
                this.toastr.error(
                    "Unable to send message!",
                    "Error");
            }
        });
    }
}
