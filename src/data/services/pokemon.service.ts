import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// interfaces
import { IPokemon } from '../interface/pokemon.interface'

@Injectable()
export class PokemonService {
    constructor(private _http: Http) {

    }

    getPokemons() {
        // Returns an array of pokemon (IPokemon interface)
        return this._http.get('data/api/pokemon.json').map(res => <IPokemon[]>res.json());
    }


    /// GETTING POKEMON FROM API AND STRINGIFY ///
    // this._pokemon.getPokemons().subscribe(res => {
    //     let keys = Object.keys(res);
    //     let test = res['name'];
    //     this.kalup['id'] = res['id'];
    //     this.kalup['name'] = res['name'];
    //     this.kalup['height'] = res['height'];
    //     this.kalup['weight'] = res['weight'];
    //     this.kalup['order'] = res['order'];
    //     this.kalup['abilities'] = res['abilities'];
    //     this.kalup['sprites'] = res['sprites'];
    //     this.kalup['types'] = res['types'];
    //     this.pokemonStringify = JSON.stringify(this.kalup);
    //     this.pokemons = JSON.stringify(res);
    //     console.log(this.pokemons);
    // })
    // return this._http.get('https://pokeapi.co/api/v2/pokemon/100/')
    // .map(res => res.json());
} 