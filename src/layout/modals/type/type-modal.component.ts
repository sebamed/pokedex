import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IType } from '../../../data/interface/type.interface';
import { PokemonService } from '../../../data/services/pokemon.service';
import { Type } from '../../../data/models/type.model';
import { Subscription } from 'rxjs/Subscription';

// animations
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';

@Component({
    selector: 'modal-types',
    templateUrl: './type-modal.component.html',
    styleUrls: ['./type-modal.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                animate(300, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                animate(300, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ]
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