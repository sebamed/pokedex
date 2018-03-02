import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMessage } from '../../../data/interface/message.interface';
import { Subscription } from 'rxjs/Subscription';
import { MessagesService } from '../../../data/services/messages.service';

// animations
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                animate(300, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                animate(300, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ]
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

    removeMessage(msg: IMessage) {
        this._messages.deleteMessage(msg);
    }
}