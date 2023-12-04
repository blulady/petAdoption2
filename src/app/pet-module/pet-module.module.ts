import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetModuleRoutingModule } from './pet-module-routing.module';
import { PetListingComponent } from './pet-listing/pet-listing.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';


@NgModule({
  declarations: [
    PetListingComponent,
    PetDetailsComponent,
    PetListComponent,
    PetDetailComponent
  ],
  imports: [
    CommonModule,
    PetModuleRoutingModule
  ]
})
export class PetModuleModule { }
