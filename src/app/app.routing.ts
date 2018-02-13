import { Routes } from "@angular/router/src/config";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule } from '@angular/router';

import { MenuComponent } from "../layout/components/menu/menu.component";
import { PokemonListComponent } from "../layout/components/pokemon-list/pokemon-list.component";


export const routes: Routes = [
   { path: '', component: PokemonListComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);