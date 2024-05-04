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

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    RacketsMainComponent,
    RacketsDetailComponent,
    HomeComponent
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
