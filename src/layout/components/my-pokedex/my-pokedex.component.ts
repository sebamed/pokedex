import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { Subscription } from 'rxjs/Subscription';
import { IPokemon } from '../../../data/interface/pokemon.interface';

@Component({
    selector: 'app-my-pokedex',
    templateUrl: './my-pokedex.component.html',
    styleUrls: ['../pokemon-list/pokemon-list.component.css',
        './my-pokedex.component.css']
})
export class MyPokedexComponent implements OnInit, OnDestroy {

    // subscriptions
    subMyPokemon: Subscription;
    subMyPokemonUpdated: Subscription;

    // my pokemon
    myPokemon: IPokemon[];

    constructor(private _pokemon: PokemonService) {

    }

    ngOnInit() {
        this.setMyPokemon();
        this.subMyPokemonUpdated = this._pokemon.myPokemonUpdated.subscribe(res => {
            this.myPokemon = res;
        }, error => console.log(error),
            () => {

            })
    }

    ngOnDestroy() {
        this.subMyPokemon.unsubscribe();
    }

    setMyPokemon() {
        this.subMyPokemon = this._pokemon.getMyPokemon().subscribe(res => {
            this.myPokemon = res;
        }, error => console.log(error),
            () => {
                console.log(this.myPokemon);
            });
    }

    removeMyPokemon(pokemon: IPokemon) {
        this._pokemon.removeMyPokemon(pokemon);
    }
}