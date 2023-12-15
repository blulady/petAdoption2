import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PetModel } from '../petmodel';
import { PetService } from '../pet.service';
import { PetfinderApiService } from '../petfinder-api.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  petId!: number;
  pet: any; // Interface for pet details

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private petfinderApiService: PetfinderApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const petIdfromParams = +params['id']; // Extract the pet ID from the route parameter
      // Fetch the detailed information of the pet using this.petId
      // Assign the retrieved data to this.pet
      this.pet = this.petfinderApiService.getPetById(petIdfromParams);
      this.petService.petSelected.subscribe((pet: PetModel) => {
        this.pet = pet;
      })
      console.log(this.pet);
    });
  }
}

