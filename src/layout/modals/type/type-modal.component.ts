import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IType } from '../../../data/interface/type.interface';

@Component({
  selector: 'modal-types',
  templateUrl: './type-modal.component.html',
  styleUrls: ['./type-modal.component.css']
})
export class TypesModalComponent implements OnInit{
  @Input() type: IType;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
      console.log(this.type.type.name);
      console.log(this.type.type.url);
  }
}