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

    getPokemon(){
        // return this._http.get('https://pokeapi.co/api/v2/pokemon/1/')
        // .map(res => res.json());
        return this._http.get('data/api/pokemon.json').map(res => res.json());
    }
} 