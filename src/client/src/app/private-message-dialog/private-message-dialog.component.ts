import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { ToastsManager } from "ng2-toastr";

import { ChatService } from "../chat.service";

@Component({
  selector: 'app-private-message-dialog',
  templateUrl: './private-message-dialog.component.html',
  styleUrls: ['./private-message-dialog.component.css']
})
export class PrivateMessageDialogComponent implements OnInit {

    id: string;
    messages: string[];

    constructor(
        private dialogRef: MdDialogRef<PrivateMessageDialogComponent>,
        private chatService: ChatService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    

}
