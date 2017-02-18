import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";

import { ChatService } from "../chat.service";
import { DialogService } from "../dialog.service";

@Component({
    selector: "app-roomlist",
    templateUrl: "./roomlist.component.html",
    styleUrls: ["./roomlist.component.css"]
})
export class RoomlistComponent implements OnInit {

    rooms: any[];
    privates: any[];
    roomName: string;

    constructor(
        private chatService: ChatService,
        private dialogService: DialogService,
        private router: Router,
        private viewContainerRef: ViewContainerRef) { }

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
            }
        });
    }

    onNewPrivateMessage() {
        this.dialogService.newPrivateMessage(this.viewContainerRef);
    }

    getDate() {
        return new Date();
    }
}
