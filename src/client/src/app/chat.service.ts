import { Injectable, ViewContainerRef } from "@angular/core";
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
                            users: Object.getOwnPropertyNames(list[room].users).length + Object.getOwnPropertyNames(list[room].ops).length
                        });
                    }
                }

                observer.next(roomList);
            });
        });

        return observable;
    }

    getPrivateList(): Observable<any[]> {
        const observable = new Observable(observer => {
            this.socket.emit("privatemessages");
            this.socket.on("privatelist", list => {
                const privateList: any[] = [];

                for (const priv in list) {
                    if (list.hasOwnProperty(priv)) {
                        privateList.push(priv);
                    }
                }

                observer.next(privateList);
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

    getPrivateMessage(): Observable<any> {
        const observable = new Observable(observer => {
            this.socket.on("recv_privatemsg", (fromUser, message) => {
                console.log("PRIVATE MESSAGE!");
                observer.next({
                    fromUser: fromUser,
                    message: message
                });
            });
        });

        return observable;
    }

    getPrivateMessages(id: string): Observable<any[]> {
        this.socket.emit("queryprivatemessages", id);
        const observable = new Observable(observer => {
            this.socket.on("getprivatemessages", messages => {
                observer.next(messages);
            });
        });

        return observable;
    }

    sendPrivateMessage(user: string, message: string): Observable<boolean> {
        const param = {
            nick: user,
            message: message
        };

        const observable = new Observable(observer => {
            this.socket.emit("privatemsg", param, succeeded => {
                observer.next(succeeded);
            });
        });

        return observable;
    }

    op(room: string, user: string): Observable<boolean> {
        const param = {
            room: room,
            user: user
        };

        const observable = new Observable(observer => {
            this.socket.emit("op", param, succeeded => {
                observer.next(succeeded);
            });
        });

        return observable;
    }

    deOp(room: string, user: string): Observable<boolean> {
        const param = {
            room: room,
            user: user
        };

        const observable = new Observable(observer => {
            this.socket.emit("deop", param, succeeded => {
                observer.next(succeeded);
            });
        });

        return observable;
    }

    kick(room: string, user: string): Observable<boolean> {
        const param = {
            room: room,
            user: user
        };

        const observable = new Observable(observer => {
            this.socket.emit("kick", param, succeeded => {
                observer.next(succeeded);
            });
        });

        return observable;
    }

    ban(room: string, user: string): Observable<boolean> {
        const param = {
            room: room,
            user: user
        };

        const observable = new Observable(observer => {
            this.socket.emit("ban", param, succeeded => {
                observer.next(succeeded);
            });
        });

        return observable;
    }

    getOpped(id: string): Observable<boolean> {
        const observable = new Observable(observer => {
            this.socket.on("opped", (room, oppedUser, oppedBy) => {
                if (room === id && oppedUser === this.userName) {
                    observer.next(true);
                }
            });
        });

        return observable;
    }

    getDeOpped(id: string): Observable<boolean> {
        const observable = new Observable(observer => {
            this.socket.on("deopped", (room, deOppedUser, deoppedBy) => {
                if (room === id && deOppedUser === this.userName) {
                    observer.next(true);
                }
            });
        });

        return observable;
    }

    getKicked(id: string): Observable<boolean> {
        const observable = new Observable(observer => {
            this.socket.on("kicked", (room, kickedUser, kickedBy) => {
                if (room === id && kickedUser === this.userName) {
                    observer.next(true);
                }
            });
        });

        return observable;
    }

    getBanned(id: string): Observable<boolean> {
        const observable = new Observable(observer => {
            this.socket.on("banned", (room, bannedUser, bannedBy) => {
                if (room === id && bannedUser === this.userName) {
                    observer.next(true);
                }
            });
        });

        return observable;
    }
}
