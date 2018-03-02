import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypesModalComponent } from '../../modals/type/type-modal.component';
import { IType } from '../../../data/interface/type.interface';
import { Subscription } from 'rxjs/Subscription';
import { MessagesService } from '../../../data/services/messages.service';

// animations
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';


@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css'],
    animations: [
        trigger('reveal', [
            state('in', style({ opacity: 1 })),
            transition('void => *', [
                animate(300, keyframes([
                    style({ opacity: 0,  offset: 0 }),
                    style({ opacity: .5, offset: 0.3 }),
                    style({ opacity: 1, offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                animate(300, keyframes([
                    style({ opacity: 1, offset: 0 }),
                    style({ opacity: .5,  offset: 0.7 }),
                    style({ opacity: 0, offset: 1.0 })
                ]))
            ])
        ])
    ]
})
export class PokemonListComponent implements OnInit, OnDestroy {

    pokemonList: IPokemon[];

    pokemonStringify: String = '123';

    // subscriptions
    subSetPokemon: Subscription;

    constructor(private _pokemon: PokemonService,
        private _modal: NgbModal, private _message: MessagesService) {
    }

    ngOnInit() {
        this.setPokemons();
    }

    ngOnDestroy() {
        this.subSetPokemon.unsubscribe();
    }

    setPokemons() {
        this.subSetPokemon = this._pokemon.getPokemons().subscribe(res => {
            this.pokemonList = res;
            //console.log(this.pokemonList);
            console.log(this.pokemonList[0].sprites.front_default);
        },
            error => console.log(error),
            () => {

            });
    }

    openTypesModal(type: IType) {
        const typesModalRef = this._modal.open(TypesModalComponent);
        typesModalRef.componentInstance.type = type;
    }

    addMyPokemon(pokemon: IPokemon) {
        this._pokemon.addMyPokemon(pokemon);
        console.log(pokemon);
    }
}