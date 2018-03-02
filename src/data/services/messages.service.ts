import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

// interfaces
import { IMessage } from "../interface/message.interface";

@Injectable()
export class MessagesService {

    // messages
    messagesList: IMessage[] = [];

    // emmiter
    messagesListUpdated: EventEmitter<any> = new EventEmitter();

    // subscriptions
    subTimerRemoveMsg: Subscription;

    // observables
    oTimer: Observable<any>;

    constructor(){
    }

    addMessage(msg: IMessage){
        this.messagesList.push(msg);
        this.messagesListUpdated.emit(this.messagesList);
        if(this.messagesList.indexOf(msg) > -1){
            this.removeMessage();
        } else {
            this.subTimerRemoveMsg.unsubscribe();
        }
    }

    removeMessage(){
        this.oTimer = Observable.timer(5000); // change if needed (time before message disapears)
        this.subTimerRemoveMsg = this.oTimer.subscribe(() => {
            this.messagesList.shift();
            this.messagesListUpdated.emit(this.messagesList);
        });
    }

    deleteMessage(msg: IMessage){
        this.messagesList.splice(this.messagesList.indexOf(msg), 1);
        this.messagesListUpdated.emit(this.messagesList);
    }
}