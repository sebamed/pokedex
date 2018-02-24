import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IType } from '../../../data/interface/type.interface';
import { PokemonService } from '../../../data/services/pokemon.service';
import { Type } from '../../../data/models/type.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'modal-types',
    templateUrl: './type-modal.component.html',
    styleUrls: ['./type-modal.component.css']
})
export class TypesModalComponent implements OnInit, OnDestroy {
    @Input() type: IType;

    typesList: Type[];
    currentType: Type;

    // subscriptions
    subTypesList: Subscription;


    constructor(public activeModal: NgbActiveModal,
        private _pokemon: PokemonService, private _modal: NgbModal) { }

    ngOnInit() {
        console.log(this.type);
        this.setTypes();
    }

    ngOnDestroy() {
        this.subTypesList.unsubscribe();
    }

    setTypes() {
        this.subTypesList = this._pokemon.getTypes().subscribe(res => {
            this.typesList = res;
            console.log(this.typesList);
        },
            error => console.log(error),
            () => {
                this.setCurrentType();
                // this happens after data is fetched
            })
    }

    setCurrentType() {
        for (let i = 0; i < this.typesList.length; i++) {
            if (this.typesList[i].name === this.type.type.name) {
                this.currentType = this.typesList[i];
                console.log(' aaaaa ');
                console.log(this.currentType);
                return;
            }
        }
    }

    openTypesModal(type: string) {
        this.activeModal.close();
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