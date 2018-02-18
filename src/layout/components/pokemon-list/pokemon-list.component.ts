import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';

@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

    pokemons: IPokemon[];

    constructor(private _pokemon: PokemonService){

    }

    ngOnInit() {
        // testing
        this._pokemon.getPokemons().subscribe(res => {
            this.pokemons = res;
            console.log(this.pokemons);
        })
    }

    ngOnDestroy() {

    }
}