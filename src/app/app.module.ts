// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';

// Components
import { MenuComponent } from '../layout/components/menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class AppModule { }
