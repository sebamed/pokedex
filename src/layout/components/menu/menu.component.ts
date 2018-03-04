import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    animations: [
        trigger('routerAnimation', [
            transition('* <=> *', [
                // Initial state of new route
                query(':enter',
                    style({
                        position: 'fixed',
                        width: '100%',
                        transform: 'translateX(-100%)'
                    }),
                    { optional: true }),

                // move page off screen right on leave
                query(':leave',
                    animate('400ms ease-in',
                        style({
                            position: 'fixed',
                            width: '100%',
                            opacity: 0
                        })
                    ),
                    { optional: true }),

                // move page in screen from left to right
                query(':enter',
                    animate('400ms ease-in',
                        style({
                            opacity: 1,
                            transform: 'translateX(0%)'
                        })
                    ),
                    { optional: true }),
            ])
        ])
    ]
})
export class MenuComponent implements OnInit, OnDestroy {

    public _opened: boolean = false;

    public _loaded: boolean = false;

    // subscriptions
    subTimer: Subscription;

    // observables
    oTimer: Observable<any>;

    constructor(private _router: Router){

    }

    ngOnInit() {
        this._router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                this._loaded = false;
                this.autoShow();
            }
        });
        this.autoShow();
    }

    ngOnDestroy() {
        this.subTimer.unsubscribe();
    }

    setActive(event) {
        for (let i = 0; i < document.getElementById("nav-list").children.length; i++) {
            document.getElementById("nav-list").children[i].classList.remove("active");
        }
        let target = event.target || event.srcElement;
        target.classList.add("active");
        this._toggleSidebar();
    }

    _toggleSidebar() {
        this._opened = !this._opened;
    }

    // change the animation state
    getRouteAnimation(outlet) {
        return outlet.activatedRouteData.animation
    }

    // auto show footer after 1.5 sec
    autoShow(){
        this.oTimer = Observable.timer(1000);
        this.subTimer = this.oTimer.subscribe(() => {
            this._loaded = true;
        });
    }
}