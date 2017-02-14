import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ChatService } from "../chat.service";

@Component({
    selector: "app-roomlist",
    templateUrl: "./roomlist.component.html",
    styleUrls: ["./roomlist.component.css"]
})
export class RoomlistComponent implements OnInit {

    rooms: any[];
    roomName: string;

    constructor(private chatService: ChatService,
        private router: Router) { }

    ngOnInit() {
        this.chatService.getRoomList().subscribe(list => {
            this.rooms = list;
        });
    }

    onAddRoom() {
        this.roomName = this.roomName.trim();

        if (this.roomName === "") {
            return;
        }

        this.chatService.addRoom(this.roomName).subscribe(succeeded => {
            if (succeeded) {
                this.router.navigate(["/rooms", this.roomName]);
            }
        });
    }
}
