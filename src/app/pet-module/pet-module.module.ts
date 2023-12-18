import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetModuleRoutingModule } from './pet-module-routing.module';
import { PetListingComponent } from './pet-listing/pet-listing.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PetListingComponent,
    PetDetailsComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PetModuleRoutingModule,
    FormsModule
  ],

})
export class PetModuleModule { }
