// Dialog service inspired by Tarik A @ Medium
// https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41#.fzq3y2sgo

import { Injectable, ViewContainerRef } from "@angular/core";
import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
import { Observable } from "rxjs/Rx";

import { NewPrivateMessageDialogComponent } from "./new-private-message-dialog/new-private-message-dialog.component";
import { PrivateMessageDialogComponent } from "./private-message-dialog/private-message-dialog.component";

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    newPrivateMessage(viewContainerRef: ViewContainerRef) {
        let dialogRef: MdDialogRef<NewPrivateMessageDialogComponent>;
        const config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(NewPrivateMessageDialogComponent, config);
    }

    privateMessage(id: string, viewContainerRef: ViewContainerRef) {
        let dialogRef: MdDialogRef<PrivateMessageDialogComponent>;
        const config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(PrivateMessageDialogComponent, config);
        dialogRef.componentInstance.id = id;
    }

}
