import { Component, OnInit } from '@angular/core';

import { ChatService } from "../chat.service";

@Component({
    selector: 'app-roomlist',
    templateUrl: './roomlist.component.html',
    styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {

    rooms: string[];

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.getRoomList().subscribe(list => {
            this.rooms = list;
        });
    }

}
