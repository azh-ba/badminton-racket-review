import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RacketsMainComponent } from './components/rackets/rackets-main/rackets-main.component';
import { RacketsDetailComponent } from './components/rackets/rackets-detail/rackets-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AddRacketComponent } from './components/add-racket/add-racket.component';
import { AboutComponent } from './components/about/about.component';
import { RacketsSearchComponent } from './components/rackets/rackets-search/rackets-search.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    RacketsMainComponent,
    RacketsDetailComponent,
    HomeComponent,
    AddRacketComponent,
    AboutComponent,
    RacketsSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
