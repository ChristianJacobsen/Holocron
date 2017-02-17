import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

    userName: string;
    socket: any;

    constructor() {

        this.socket = io("http://localhost:8080/");
        this.socket.on("connect", function () {
            console.log("connected");
        });

    }

    login(userName: string): Observable<boolean> {
        const observable = new Observable(observer => {
            this.socket.emit("adduser", userName, succeeded => {
                if (succeeded) {
                    this.userName = userName;
                }

                observer.next(succeeded);
            });
        });

        return observable;
    }

    getRoomList(): Observable<any[]> {
        const observable = new Observable(observer => {
            this.socket.emit("rooms");
            this.socket.on("roomlist", list => {
                const roomList: any[] = [];

                for (const room in list) {
                    if (list.hasOwnProperty(room)) {
                        roomList.push({
                            name: room,
                            users: Object.getOwnPropertyNames(list[room].users).length
                        });
                    }

                }
                observer.next(roomList);
            });
        });

        return observable;
    }

    joinAddRoom(roomName: string): Observable<boolean> {
        const observable = new Observable(observer => {
            const param = {
                room: roomName
            };

            this.socket.emit("joinroom", param, function (a: boolean, b) {
                observer.next(a);
            });
        });

        return observable;
    }

    sendMessage(id: string, msg: string) {
        const param = {
            roomName: id,
            msg: msg
        };

        this.socket.emit("sendmsg", param);
    }

    getMessages(id: string): Observable<any[]> {
        const observable = new Observable(observer => {
            this.socket.on("updatechat", (roomName, messageHistory) => {
                if (roomName === id) {
                    observer.next(messageHistory);
                }
            });
        });

        return observable;
    }
}
