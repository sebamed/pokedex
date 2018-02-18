import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';

@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

    pokemon: any;

    constructor(private _pokemon: PokemonService){

    }

    ngOnInit() {
        this._pokemon.getPokemon().subscribe(res => {
            this.pokemon = res;
            console.log(this.pokemon);
            console.log(this.pokemon.name);
            
        })
    }

    ngOnDestroy() {

    }
}