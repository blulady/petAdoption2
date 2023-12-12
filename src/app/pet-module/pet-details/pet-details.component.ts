import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  petId!: number;
  pet: any; // Interface for pet details

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.petId = +params['id']; // Extract the pet ID from the route parameter
      // Fetch the detailed information of the pet using this.petId
      // Assign the retrieved data to this.pet
    });
  }
}

