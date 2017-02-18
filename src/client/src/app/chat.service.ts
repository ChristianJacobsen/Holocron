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

    getUsername() {
        return this.userName;
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

    joinAddRoom(id: string): Observable<boolean> {
        const observable = new Observable(observer => {
            const param = {
                room: id
            };

            this.socket.emit("joinroom", param, function (a: boolean, b) {
                observer.next(a);
            });
        });

        return observable;
    }

    leaveRoom(id: string) {
        this.socket.emit("partroom", id);
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

    getUsers(id: string): Observable<any> {
        const observable = new Observable(observer => {
            this.socket.on("updateusers", (roomName, users, ops) => {
                if (roomName === id) {
                    const usersArr = [];
                    const opsArr = [];

                    for (const user in users) {
                        if (users.hasOwnProperty(user)) {
                            usersArr.push(user);
                        }
                    }

                    for (const op in ops) {
                        if (ops.hasOwnProperty(op)) {
                            opsArr.push(op);
                        }
                    }

                    observer.next({
                        users: usersArr,
                        ops: opsArr
                    });
                }
            });
        });

        return observable;
    }
}
