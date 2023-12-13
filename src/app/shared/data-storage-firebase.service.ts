import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetService } from '../pet-module/pet.service';
import { PetModel, FavoritePetModel } from '../pet-module/petmodel';

@Injectable({ providedIn: 'root' })
export class DataStorageFirebase {

  constructor(private http: HttpClient, private petService: PetService) {}

  storePets() {
    const petList = this.petService.getPets();
    this.http.put(
      'https://petadoption-9abd7-default-rtdb.firebaseio.com/pets.json', petList
    ).subscribe(response => {
      console.log('Pets stored on Firebase:', response);
    });
  }

  fetchPets() {
    this.http.get<PetModel[]>(
      'https://petadoption-9abd7-default-rtdb.firebaseio.com/pets.json'
    ).subscribe(petList => {
      this.petService.setPetList(petList);
    });
  }

  fetchFavPets() {
    this.http.get<FavoritePetModel[]>(
      'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json'
    ).subscribe(favPetList => {
      this.petService.setFavoritePets(favPetList);
    });
  }
}
