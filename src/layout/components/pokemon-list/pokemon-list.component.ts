import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypesModalComponent } from '../../modals/type/type-modal.component';
import { IType } from '../../../data/interface/type.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-poke-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

    pokemonList: IPokemon[];

    pokemonStringify: String = '123';

    // subscriptions
    subSetPokemon: Subscription;

    constructor(private _pokemon: PokemonService,
        private modalService: NgbModal) {
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
        const typesModalRef = this.modalService.open(TypesModalComponent);
        typesModalRef.componentInstance.type = type;
    }
}