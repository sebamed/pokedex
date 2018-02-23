import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {

    // subscriptions
    subRouterParams: Subscription;

    currentPokemon: IPokemon;

    currentID: number;

    constructor(private _route: ActivatedRoute,
        private _pokemon: PokemonService) {

    }

    ngOnInit() {
        this.getUrlParams();
        this.setCurrentPokemon();
    }

    ngOnDestroy() {
        this.subRouterParams.unsubscribe();
    }

    getUrlParams() {
        this.subRouterParams = this._route.params.subscribe(params => {
            console.log(params['id']);
            this.currentID = params['id'];
            console.log(this.currentID);
        });
    }

    setCurrentPokemon() {
        this._pokemon.getPokemons().subscribe(res => {
            this.currentPokemon = res[this.currentID - 1];
            console.log(this.currentPokemon);
        })
    }
}