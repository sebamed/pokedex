import { Component, OnInit, OnDestroy } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }
}