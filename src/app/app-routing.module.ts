import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RacketsMainComponent } from './components/rackets/rackets-main/rackets-main.component';
import { HomeComponent } from './components/home/home.component';
import { RacketsDetailComponent } from './components/rackets/rackets-detail/rackets-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rackets', component: RacketsMainComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: RacketsDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
