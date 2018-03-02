import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { trigger, state, style, animate, transition, query } from '@angular/animations';

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

    private _opened: boolean = false;

    ngOnInit() {
    }

    ngOnDestroy() {

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
}