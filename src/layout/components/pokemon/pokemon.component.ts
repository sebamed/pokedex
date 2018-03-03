import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../../../data/services/pokemon.service';
import { IPokemon } from '../../../data/interface/pokemon.interface';
import { IType } from '../../../data/interface/type.interface';
import { TypesModalComponent } from '../../modals/type/type-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../../../data/models/type.model';
import { MessagesService } from '../../../data/services/messages.service';

// enumerator
import { MessageType } from '../../../data/enum/message-type.enum';

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
    subRecentPokemon: Subscription;
    subPokemonTypes: Subscription;
    subUrlParams: Subscription;

    // current
    currentPokemon: IPokemon;
    currentID: number;
    currentMaleFemaleText: string = 'male';
    currentRotation: boolean = false;
    currentTypes: Type[] = [];

    // pokemon list 
    pokemonCount: number;

    // types
    pokemonTypes: Type[];

    // searched
    searchedPokemon: IPokemon[];

    constructor(private _route: ActivatedRoute,
        private _pokemon: PokemonService,
        private _modal: NgbModal,
        private _router: Router,
        private _message: MessagesService) {

    }

    ngOnInit() {
        this.getUrlParams();
        this.setCurrentPokemon();
        this.setSearchedPokemon();
    }

    ngOnDestroy() {
        try {
            this.addToSearchedPokemon();
            this.subRouterParams.unsubscribe();
            this.subPokemon.unsubscribe();
            this.subRecentPokemon.unsubscribe();
            this.subUrlParams.unsubscribe();
        } catch {
            console.log("something is still subscribed");
        }
    }

    setCurrentType() {
        this.subPokemonTypes = this._pokemon.getTypes().subscribe(res => {
            this.pokemonTypes = res;
        }, error => console.log(error),
            () => {
                for (let i = 0; i < this.pokemonTypes.length; i++) {
                    for (let j = 0; j < this.currentPokemon.types.length; j++) {
                        if (this.pokemonTypes[i].name === this.currentPokemon.types[j].type.name) {
                            this.currentTypes.push(this.pokemonTypes[i]);
                            console.log('postoji');
                            console.log(this.pokemonTypes[i].name);
                        }
                    }
                }
            });
    }

    setSearchedPokemon() {
        this.subRecentPokemon = this._pokemon.getSearchedPokemon().subscribe(res => {
            this.searchedPokemon = res;
        },
            error => console.log(error),
            () => {

            });
    }

    addToSearchedPokemon() {
        this._pokemon.addSearchedPokemon(this.currentPokemon);
        this._pokemon.getSearchedPokemon().subscribe(res => {
            console.log(res);
        });
    }

    getUrlParams() {
        this.subRouterParams = this._route.params.subscribe(params => {
            this.currentID = params['id'];
        });
    }


    checkUrl() {
        if (Number(this.currentID) > this.pokemonCount || isNaN(this.currentID)) {
            console.log("nije url dobar");
            this._router.navigateByUrl('error');
            this.ngOnDestroy();
        }
    }

    setCurrentPokemon() {
        this.subPokemon = this._pokemon.getPokemons().subscribe(res => {
            this.pokemonCount = res.length;
            this.checkUrl();
            this.currentPokemon = res[this.currentID - 1];
            console.log(this.currentPokemon);
        },
            error => console.log(error),
            () => {
                this.setClickableMaleFemale(this.currentPokemon);
                this.setCurrentType();
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
        $(document).ready(function () {
            let button = document.getElementById('gender');
            if (pokemon.sprites.front_female == null) {
                button.setAttribute('disabled', 'true');
            } else {
                button.removeAttribute('disabled');
            }
        });
    }

    changeSex() {
        if (this.currentMaleFemaleText === 'male') {
            document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_default);
            this.currentRotation = false;
            this._message.addMessage({
                message: 'Female version of ' + this.currentPokemon.name + ' is selected',
                type: MessageType.info
            });
            return;
        }
        else if (this.currentMaleFemaleText === 'female') {
            document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_female);
            this.currentRotation = false;
            this._message.addMessage({
                message: 'Male version of ' + this.currentPokemon.name + ' is selected',
                type: MessageType.info
            });
            return;
        }
    }

    rotateImage() {
        if (this.currentMaleFemaleText === 'male') {
            if (this.currentRotation) {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_default);
                this.toggleRotation();
            } else {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.back_default);
                this.toggleRotation();
            }
        }
        else if (this.currentMaleFemaleText === 'female') {
            if (this.currentRotation) {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.front_female);
                this.toggleRotation();
            } else {
                document.getElementById('pokemon-image').setAttribute('src', this.currentPokemon.sprites.back_female);
                this.toggleRotation();
            }
        }
        this._message.addMessage({
            message: 'Pokemon rotated!',
            type: MessageType.info
        });
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

    openNewPokemon(id: number) {
        this._router.navigate(['/pokemon', id]);
        this.currentTypes = []; // reseting array
        this.ngOnDestroy();
        this.ngOnInit();
    }

    addMyPokemon(pokemon: IPokemon) {
        this._pokemon.addMyPokemon(pokemon);
    }
}