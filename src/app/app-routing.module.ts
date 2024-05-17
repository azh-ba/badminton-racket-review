import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RacketsMainComponent } from './components/rackets/rackets-main/rackets-main.component';
import { HomeComponent } from './components/home/home.component';
import { RacketsDetailComponent } from './components/rackets/rackets-detail/rackets-detail.component';
import { AddRacketComponent } from './components/add-racket/add-racket.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SpecsComponent } from './components/specs/specs.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rackets', component: RacketsMainComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: RacketsDetailComponent },
  { path: 'add', component: AddRacketComponent },
  { path: 'about', component: AboutComponent },
  { path: 'specs', component: SpecsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
