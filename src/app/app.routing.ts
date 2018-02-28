import { Routes } from "@angular/router/src/config";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule } from '@angular/router';

import { MenuComponent } from "../layout/components/menu/menu.component";
import { PokemonListComponent } from "../layout/components/pokemon-list/pokemon-list.component";
import { PokemonComponent } from "../layout/components/pokemon/pokemon.component";
import { MyPokedexComponent } from "../layout/components/my-pokedex/my-pokedex.component";


export const routes: Routes = [
    { path: '', component: PokemonListComponent, pathMatch: 'full' },
    { path: 'pokemon/:id', component: PokemonComponent },
    { path: 'mypokedex', component: MyPokedexComponent },
    { path: '**', component: MyPokedexComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);