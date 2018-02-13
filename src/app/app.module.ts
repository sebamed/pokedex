// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { RouterModule } from '@angular/router';

// routing 
import { Routing } from './app.routing';

// Components
import { MenuComponent } from '../layout/components/menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    RouterModule,
    Routing
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class AppModule { }
