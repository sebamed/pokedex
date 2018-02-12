import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

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

    _toggleSidebar() {
        this._opened = !this._opened;
    }

}