import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RacketsMainComponent } from './components/rackets/rackets-main/rackets-main.component';
import { HomeComponent } from './components/home/home.component';
import { RacketsDetailComponent } from './components/rackets/rackets-detail/rackets-detail.component';
import { AddRacketComponent } from './components/add-racket/add-racket.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rackets', component: RacketsMainComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: RacketsDetailComponent },
  { path: 'add', component: AddRacketComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
