import { Component, OnInit, OnDestroy, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { Observable } from "rxjs/Observable";

import { ChatService } from "../chat.service";
import { DialogService } from "../dialog.service";

@Component({
    selector: "app-roomlist",
    templateUrl: "./roomlist.component.html",
    styleUrls: ["./roomlist.component.css"]
})
export class RoomlistComponent implements OnInit, OnDestroy {
    rooms: any[];
    privates: any[];
    roomName: string;
    privateMessagingWith: string;

    constructor(
        private chatService: ChatService,
        private dialogService: DialogService,
        private router: Router,
        private vcr: ViewContainerRef,
        private toastr: ToastsManager
    ) {
        this.toastr.setRootViewContainerRef(this.vcr);
    }

    ngOnInit() {
        if (this.chatService.getUsername() === undefined) {
            this.router.navigate(["/login"]);
        }

        this.chatService.getRoomList().subscribe(list => {
            this.rooms = list;
        });

        this.chatService.getPrivateList().subscribe(list => {
            this.privates = list;
        });

        this.chatService.getPrivateMessage().subscribe(msg => {
            if (msg.fromUser !== this.privateMessagingWith) {
                // Set the root vcr in case a modal has been opened
                this.toastr.setRootViewContainerRef(this.vcr);

                this.toastr.info(
                    msg.message,
                    msg.fromUser);
            }

        });
    }

    ngOnDestroy() {
        this.chatService.removeListeners();
    }

    onAddRoom() {
        this.roomName = this.roomName.trim();

        if (this.roomName === "") {
            return;
        }

        this.chatService.joinAddRoom(this.roomName).subscribe(succeeded => {
            if (succeeded) {
                this.router.navigate(["/rooms", this.roomName]);
            }
        });
    }

    onJoinRoom(roomName: string) {
        roomName = roomName.trim();

        if (roomName === "") {
            return;
        }

        this.chatService.joinAddRoom(roomName).subscribe(succeeded => {
            if (succeeded) {
                this.router.navigate(["/rooms", roomName]);
            } else {
                this.toastr.warning(
                    "You are banned from the room",
                    "Unable to join room");
            }
        });
    }

    onNewPrivateMessage() {
        this.dialogService.newPrivateMessage(this.vcr);
    }

    onPrivateMessage(id: string) {
        this.privateMessagingWith = id;
        this.dialogService.privateMessage(id, this.vcr).subscribe(closed => {
            this.privateMessagingWith = "";
        });
    }

    getDate() {
        return new Date();
    }
}
