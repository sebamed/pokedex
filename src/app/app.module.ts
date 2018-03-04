// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Animation modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Pipes 
import { CapitalizeLettersPipe } from '../pipes/capitalize-letters.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

// routing 
import { Routing } from './app.routing';

// Services
import { PokemonService } from '../data/services/pokemon.service';
import { MessagesService } from '../data/services/messages.service';

// Components
import { MenuComponent } from '../layout/components/menu/menu.component';
import { PokemonListComponent } from '../layout/components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from '../layout/components/pokemon/pokemon.component';
import { MyPokedexComponent } from '../layout/components/my-pokedex/my-pokedex.component';
import { MessagesComponent } from '../layout/components/messages/messages.component';
import { FooterComponent } from '../layout/components/footer/footer.component';
import { AppComponent } from './app.component';

// Modals 
import { TypesModalComponent } from '../layout/modals/type/type-modal.component';

@NgModule({
  declarations: [
    CapitalizeLettersPipe,
    FilterPipe,
    MenuComponent,
    PokemonListComponent,
    PokemonComponent,
    TypesModalComponent,
    MyPokedexComponent,
    MessagesComponent,
    FooterComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    Routing
  ],
  providers: [PokemonService, MessagesService],
  bootstrap: [MenuComponent],
  entryComponents: [TypesModalComponent]
})
export class AppModule { }
