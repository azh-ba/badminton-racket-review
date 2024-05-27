import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { RacketsEditComponent } from './components/rackets/rackets-edit/rackets-edit.component';
import { ErrorsComponent } from './components/errors/errors.component';

import { CustomErrorHandler } from './services/custom-error-handler.service';
import { GlobalHttpErrorHandlerInterceptor } from './interceptors/global-http-error-handler.interceptor';

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
    SpecsComponent,
    RacketsEditComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    CustomErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorHandlerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
