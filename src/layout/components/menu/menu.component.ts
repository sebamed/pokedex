import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
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
}