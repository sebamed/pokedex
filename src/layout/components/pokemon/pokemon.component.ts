import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';
import { IType } from '../../../data/interface/type.interface';
import { TypesModalComponent } from '../../modals/type/type-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    currentMaleFemaleText: string = 'male';
    currentRotation: boolean = false;

    constructor(private _route: ActivatedRoute,
        private _pokemon: PokemonService,
        private _modal: NgbModal) {

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
            this.currentMaleFemaleText = 'female';
            document.getElementById('gender-icon').classList.remove('fa-mars');
            document.getElementById('gender-icon').classList.add('fa-venus');
        } else if (this.currentMaleFemaleText === 'female') { // swithing to male
            this.currentMaleFemaleText = 'male';
            document.getElementById('gender-icon').classList.remove('fa-venus');
            document.getElementById('gender-icon').classList.add('fa-mars');
        }
        this.changeSex();
    }

    setClickableMaleFemale(pokemon: IPokemon) {
        $(window).ready(function () {
            if (pokemon.sprites.front_female == null) {
                let button = document.getElementById('gender');
                button.setAttribute('disabled', 'true');
            }
        });
    }

    changeSex() {
        if (this.currentMaleFemaleText === 'male') {
            document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_default);
            this.currentRotation = false;
            return;
        }
        else if (this.currentMaleFemaleText === 'female') {
            document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_female);
            this.currentRotation = false;
            return;
        }
    }

    rotateImage() {
        if (this.currentMaleFemaleText === 'male') {
            if (this.currentRotation) {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_default);
                this.toggleRotation();
                return;
            } else {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.back_default);
                this.toggleRotation();
                return;
            }
        }
        else if (this.currentMaleFemaleText === 'female') {
            if (this.currentRotation) {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_female);
                this.toggleRotation();
                return;
            } else {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.back_female);
                this.toggleRotation();
                return;
            }
        }
    }

    toggleRotation() {
        this.currentRotation = !this.currentRotation;
    }

    openTypesModal(type: string) {
        let newType: IType = {
            slot: 0,
            type: {
                url: "string",
                name: type
            }
        };
        console.log(newType);
        const typesModalRef = this._modal.open(TypesModalComponent);
        typesModalRef.componentInstance.type = newType;
    }
}