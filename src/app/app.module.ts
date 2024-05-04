import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RacketsMainComponent } from './components/rackets/rackets-main/rackets-main.component';
import { RacketsDetailComponent } from './components/rackets/rackets-detail/rackets-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    RacketsMainComponent,
    RacketsDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
