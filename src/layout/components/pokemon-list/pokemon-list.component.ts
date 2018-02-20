import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';

@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

    pokemonList: IPokemon[];

    pokemonStringify: String = '123';

    constructor(private _pokemon: PokemonService) {

    }

    ngOnInit() {
        this.setPokemons();
    }

    ngOnDestroy() {

    }

    setPokemons() {
        this._pokemon.getPokemons().subscribe(res => {
            this.pokemonList = res;
            console.log(this.pokemonList);
        })
    }
}