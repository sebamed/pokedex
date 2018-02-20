import { IAbility } from "./ability.interface";
import { IType } from "./type.interface";
import { ISprite } from "./sprite.interface";

export interface IPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    order: number;
    abilities: IAbility[];
    types: IType[];
    sprites: ISprite[];
}