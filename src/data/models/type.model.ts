import { IType } from "../interface/type.interface";

export class Type {
    id: number;
    name: string;
    damage_relations: {
        half_damage_from: [{
            url: string;
            name: string;
        }];
        no_damage_from: [{
            url: string;
            name: string;
        }];
        half_damage_to: [{
            url: string;
            name: string;
        }];
        double_damage_from: [{
            url: string;
            name: string;
        }];
        no_damage_to: [{
            url: string;
            name: string;
        }];
        double_damage_to: [{
            url: string;
            name: string;
        }];
    };
    moves: [{
        url: string;
        name: string;
    }];
}