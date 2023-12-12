import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { PetModuleModule } from './pet-module/pet-module.module';
import { AuthModule } from './auth/auth.module';
import { PetDetailsComponent } from './pet-module/pet-details/pet-details.component';

const routes: Routes = [
  {path: 'home',
  loadChildren: () => import('./home/home.module').then(
    m => m.HomeModule
  )},
  {path: 'pet',
  loadChildren: () => import('./pet-module/pet-module.module').then(
    m => m.PetModuleModule
  )},
  {path: 'login',
  loadChildren: () => import('./auth/auth.module').then(
    m => m.AuthModule
  )},
  { path: 'pet/:id', component: PetDetailsComponent } //added to path to pet/ :id -garrett
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
