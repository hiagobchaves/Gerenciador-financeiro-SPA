import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GastosComponent } from './pages/gastos/gastos.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
    {
    path: 'gastos',
    component: GastosComponent,
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
