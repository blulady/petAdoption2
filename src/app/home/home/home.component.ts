import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/pet-module/pet.service';
import { FavoritePetModel, PetModel } from 'src/app/pet-module/petmodel';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  animalsToShow: any[] = []; // Initialized as empty array
  showButtons: boolean = true;
  petData: PetModel[] = [];

  constructor(private data: DataStorageFirebase, private petService: PetService, private router: Router) { }



  ngOnInit(): void {
    this.data.fetchPets();
    this.petService.petListChange.subscribe((pets: PetModel[]) => {
      this.animalsToShow = pets;
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/pet', id]);
  }

  toggleFavorite(pet: PetModel): void {
    if (this.isFavorite(pet)) {
      this.petService.removeFromFavorites(pet);
    } else {
      const favoritePet: FavoritePetModel = { ...pet, favoriteDate: new Date() };
      this.petService.addToFavorites(favoritePet);
    }
  }

  isFavorite(pet: PetModel): boolean {
    return this.petService.getFavorites().some(fav => fav.id === pet.id);
  }

  // Function to display cats
  // Function to filter and display cats
  showCats(): void {
    this.animalsToShow = this.petService.getPets().filter(pet => pet.species === 'cat');
    this.showButtons = false;
  }

  showDogs(): void {
    this.animalsToShow = this.petService.getPets().filter(pet => pet.species === 'dog');
    this.showButtons = false;
  }
  resetView(): void {
    this.showButtons = true;
    this.ngOnInit(); // Call ngOnInit logic again
    this.animalsToShow = []; // Clear the animalsToShow array
  }

  }




