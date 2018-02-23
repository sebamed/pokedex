import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';

declare var $: any;

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {

    // subscriptions
    subRouterParams: Subscription;
    subPokemon: Subscription;

    // current
    currentPokemon: IPokemon;
    currentID: number;
    currentMaleFemaleText: string = "male";

    constructor(private _route: ActivatedRoute,
        private _pokemon: PokemonService) {

    }

    ngOnInit() {
        this.getUrlParams();
        this.setCurrentPokemon();
    }

    ngOnDestroy() {
        this.subRouterParams.unsubscribe();
        this.subPokemon.unsubscribe();
    }

    getUrlParams() {
        this.subRouterParams = this._route.params.subscribe(params => {
            this.currentID = params['id'];
        });
    }

    setCurrentPokemon() {
        this.subPokemon = this._pokemon.getPokemons().subscribe(res => {
            this.currentPokemon = res[this.currentID - 1];
            console.log(this.currentPokemon);
        },
            error => console.log(error),
            () => {
                this.setClickableMaleFemale(this.currentPokemon);
            });
    }

    toggleMaleFemale(event) {
        let target = event.target || event.srcElement;
        if (this.currentMaleFemaleText === 'male') { // switching to female
            target.classList.remove('male');
            target.classList.add('female');
            this.currentMaleFemaleText = 'female';
        } else { // swithing to male
            target.classList.remove('female');
            target.classList.add('male');
            this.currentMaleFemaleText = 'male';
        }
    }

    setClickableMaleFemale(pokemon: IPokemon) {
        $(window).ready(function () {
            if (pokemon.sprites.front_female == null) {
                let button = document.getElementById('gender');
                button.setAttribute('disabled', 'true');
            }
        });
    }
}