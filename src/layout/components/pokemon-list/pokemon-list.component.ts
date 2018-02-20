import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';

@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

    pokemons: any;

    kalup: Object = {}

    pokemonStringify: String = '123';

    constructor(private _pokemon: PokemonService){

    }

    ngOnInit() {
        // testing
        this._pokemon.getPokemons().subscribe(res => {
            let keys = Object.keys(res);
            let test = res['name'];
            this.kalup['id'] = res['id'];
            this.kalup['name'] = res['name'];
            this.kalup['height'] = res['height'];
            this.kalup['weight'] = res['weight'];
            this.kalup['order'] = res['order'];
            this.kalup['abilities'] = res['abilities'];
            this.kalup['sprites'] = res['sprites'];
            this.kalup['types'] = res['types'];
            this.pokemonStringify = JSON.stringify(this.kalup);
            console.log(keys);
            console.log(this.kalup);
            // this.pokemons = JSON.stringify(res);
            // console.log(this.pokemons);
        })
    }

    ngOnDestroy() {

    }
}