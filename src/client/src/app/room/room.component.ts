import { Component, OnInit, OnDestroy, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager } from "ng2-toastr";

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
    chatBox: HTMLElement;
    messageBox: HTMLTextAreaElement;
    userName: string;
    isOp: boolean;

    constructor(private chatService: ChatService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(this.vcr);
    }

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
                this.messages = messages;
            }
        });

        this.chatService.getUsers(this.id).subscribe(allUsers => {
            this.users = allUsers.users;
            this.ops = allUsers.ops;

            if (this.ops.indexOf(this.chatService.getUsername()) !== -1) {
                this.isOp = true;
            }
        });

        this.chatService.getPrivateMessage().subscribe(msg => {
            this.toastr.info(
                msg.message,
                msg.fromUser);
        });

        this.chatService.getOpped(this.id).subscribe(opped => {
            if (opped) {
                this.toastr.success(
                    "You have been opped!",
                    "Opped!");
            }
        });

        this.chatService.getDeOpped(this.id).subscribe(deOpped => {
            if (deOpped) {
                this.toastr.warning(
                    "You have been de-opped",
                    "De-opped!");
            }
        });

        this.chatService.getKicked(this.id).subscribe(kicked => {
            if (kicked) {
                this.router.navigate(["/rooms"]);
            }
        });

        this.chatService.getBanned(this.id).subscribe(banned => {
            if (banned) {
                this.router.navigate(["/rooms"]);
            }
        });
    }

    ngOnDestroy() {
        if (this.userName !== undefined) {
            this.chatService.leaveRoom(this.id);
        }

        this.chatService.removeListeners();
    }

    trackByFn(index, item) {
        return index;
    }

    scroll() {
        // The timeout is simply to wait until the messages have rendered
        setTimeout(function () {
            this.chatBox.scrollTop = this.chatBox.scrollHeight - this.chatBox.clientHeight;
        }, 100);
    }

    onSubmit() {
        if (this.messageBox.value === "") {
            return;
        }

        this.chatService.sendMessage(this.id, this.messageBox.value);

        this.messageBox.value = "";
    }

    onOp(user: string) {
        this.chatService.op(this.id, user).subscribe(succeeded => {
            if (succeeded) {
                this.toastr.success(
                    user + " has been added to ops!",
                    "Success!");
            } else {
                this.toastr.error(
                    "Could not op " + user,
                    "Error!");
            }
        });
    }

    onDeop(user: string) {
        this.chatService.deOp(this.id, user).subscribe(succeeded => {
            if (succeeded) {
                this.toastr.success(
                    user + " has been removed from ops!",
                    "Success!");
            } else {
                this.toastr.error(
                    "Could not deop " + user,
                    "Error!");
            }
        });
    }

    onKick(user: string) {
        this.chatService.kick(this.id, user).subscribe(succeeded => {
            if (succeeded) {
                this.toastr.success(
                    user + " has been removed from kicked!",
                    "Success!");
            } else {
                this.toastr.error(
                    "Could not kick " + user,
                    "Error!");
            }
        });
    }

    onBan(user: string) {
        this.chatService.ban(this.id, user).subscribe(succeeded => {
            if (succeeded) {
                this.toastr.success(
                    user + " has been banned",
                    "Success!");
            } else {
                this.toastr.error(
                    "Could not ban " + user,
                    "Error!");
            }
        });
    }
}
