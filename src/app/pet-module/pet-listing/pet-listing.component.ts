import { Component } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { PetService } from '../pet.service';
import { PetfinderApiService } from '../petfinder-api.service';
import { PetModel } from '../petmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.css']
})
export class PetListingComponent {
  petData: PetModel[] = [];
  showForm: boolean = false;
  newPet: Partial<PetModel> = {}; // Partial type for the new pet object
  formValid: boolean = true; // Flag to track form validation
  addToFavorites = false; // Set this to true when addToFavorites is triggered

  constructor(
    private data: DataStorageFirebase,
    private petService: PetService,
    private petfinderApiService: PetfinderApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPetList();
    this.petService.petListChange.subscribe((pets: PetModel[]) => {
      this.petData = pets;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/pet', id]);
  }

  getToken() {
    return new Promise<void>((resolve, reject) => {
      this.petfinderApiService.getOAuthToken();
      resolve();
    });
  }

  getPetList() {
    this.petfinderApiService.getListOfPets();
    this.petService.setPetList(this.petfinderApiService.petList);
    this.petService.petListChange.next(this.petService.petData.slice());
    console.log(this.petService.petData.slice());
  }

  isFavorite(pet: PetModel): boolean {
    return this.petService.getFavorites().some(fav => fav.id === pet.id);
  }
// I LEFT IN IN CASE I HAVE TO REVERT BUGGING HOME PAGE??? below
  // toggleFavorite(pet: PetModel): void {
  //   if (this.isFavorite(pet)) {
  //     this.petService.removeFromFavorites(pet);
  //   } else {
  //     this.petService.addToFavorites(pet);
  //   }
  // }

  toggleFavorite(pet: PetModel): void {
    const index = this.petData.findIndex((item) => item.id === pet.id);
    if (index !== -1) {
      if (this.isFavorite(pet)) {
        this.petService.removeFromFavorites(pet);
      } else {
        this.petService.addToFavorites(pet);
      }

      // Reorganize petData array putting all favorites at the front
      this.petData.sort((a, b) => {
        const aIsFavorite = this.isFavorite(a) ? -1 : 1;
        const bIsFavorite = this.isFavorite(b) ? -1 : 1;
        return aIsFavorite - bIsFavorite;
      });
    }
  }

  deletePet(pet: PetModel): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to remove this listing, and not see it again?')) {
      this.petService.deletePet(pet);
    }
  }

  showAddPetForm(): void {
    this.showForm = !this.showForm; // Toggle form visibility
    if (!this.showForm) {
      this.clearForm(); // Clear form fields if form is hidden
    }
  }

  generateUniqueId(): number {
    return Math.floor(Math.random() * 10000); // Replace this with your unique ID generation logic
  }

  onSubmit(): void {
    this.checkFormValidity(); // Check form validity before submission
    if (this.formValid) {
      const newPet: PetModel = {
        id: this.generateUniqueId(),
        name: this.newPet.name!,
        species: this.newPet.species!,
        description: this.newPet.description!,
        photo: this.newPet.photo!,
      };

      this.data.storePet(newPet).subscribe(response => {
        console.log('New pet stored in Firebase:', response);
        this.petData.push(newPet);
        this.clearForm();
        this.showForm = false;
      });
    } else {
      alert('Please fill out all fields.');
    }
  }

  checkFormValidity(): void {
    this.formValid = true;
    if (!this.newPet.name || !this.newPet.species || !this.newPet.description || !this.newPet.photo) {
      this.formValid = false;
    }
  }

  clearForm(): void {
    this.newPet = {};
  }

  editPet(petId: number): void {
    event.stopPropagation();
    const selectedPet = this.petData.find(pet => pet.id === petId);
    if (selectedPet) {
      this.newPet = { ...selectedPet };
      this.showForm = true;
    }
  }
}
