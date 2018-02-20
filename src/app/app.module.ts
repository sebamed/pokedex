// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Pipes 
import { CapitalizeLettersPipe } from '../pipes/capitalize-letters.pipe';

// routing 
import { Routing } from './app.routing';

// Services
import { PokemonService } from '../data/services/pokemon.service';

// Components
import { MenuComponent } from '../layout/components/menu/menu.component';
import { PokemonListComponent } from '../layout/components/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [
    CapitalizeLettersPipe,
    MenuComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    RouterModule,
    HttpModule,
    FormsModule,
    Routing
  ],
  providers: [PokemonService],
  bootstrap: [MenuComponent]
})
export class AppModule { }
