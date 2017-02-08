import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

    socket: any;

    constructor() {

        this.socket = io("http://localhost:8080/");
        this.socket.on("connect", function () {
            console.log("connected");
        });

    }

    login(userName: string): Observable<boolean> {
        let observable = new Observable(observer => {
            this.socket.emit("adduser", userName, succeeded => {
                observer.next(succeeded);
            });
        });

        return observable;
    }

    getRoomList(): Observable<string[]> {
        let observable = new Observable(observer => {
            this.socket.emit("rooms");
            this.socket.on("roomlist", list => {
                let roomList: string[] = [];
                for (var x in list) {
                    roomList.push(x);
                }
                observer.next(roomList);
            });
        });

        return observable;
    }

}
