import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMessage } from '../../../data/interface/message.interface';
import { Subscription } from 'rxjs/Subscription';
import { MessagesService } from '../../../data/services/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

    // messages
    messagesList: IMessage[] = [];

    // subscriptions
    subMessagesList: Subscription;
    subMessagesListUpdate: Subscription;

    constructor(private _messages: MessagesService) {

    }

    ngOnInit() {
        this.subMessagesListUpdate = this._messages.messagesListUpdated.subscribe(res => {
            this.messagesList = res;
        },
            error => console.log(error),
            () => {
                console.log('emitter log');
            });
    }

    ngOnDestroy() {
        this.subMessagesList.unsubscribe();
    }

    removeMessage(msg: IMessage){
        this._messages.deleteMessage(msg);
    }
}