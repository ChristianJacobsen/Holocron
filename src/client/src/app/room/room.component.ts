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

    constructor(private chatService: ChatService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.route.snapshot.params["id"];
    }
}
