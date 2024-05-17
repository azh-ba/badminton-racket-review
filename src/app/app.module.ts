import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RacketsListComponent } from './components/rackets/rackets-list/rackets-list.component';
import { SpecsComponent } from './components/specs/specs.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    RacketsMainComponent,
    RacketsDetailComponent,
    HomeComponent,
    AddRacketComponent,
    AboutComponent,
    RacketsSearchComponent,
    PageNotFoundComponent,
    RacketsListComponent,
    SpecsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
