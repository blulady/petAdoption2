import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetModel, FavoritePetModel } from './petmodel';
import { HttpClient } from '@angular/common/http'; // Import HttpClient instead of HttpClientModule

@Injectable({
  providedIn: 'root'
})
export class PetService {

  startedEditing = new Subject<number>();
  petSelected = new Subject<PetModel>();
  petListChange = new Subject<PetModel[]>();
  petFavSelected = new Subject<FavoritePetModel>();
  petFavListChange = new Subject<FavoritePetModel[]>();
  petFavorites: FavoritePetModel[] = [];

  private petData: PetModel[] = [];

  constructor(private http: HttpClient) {} // Inject HttpClient here

  // Function to return petData array of pets
  getPets(): PetModel[] {
    return this.petData;
  }

  // Function to create a new pet
  addPet(pet: PetModel): void {
    this.petData.push(pet);
    this.petListChange.next([...this.petData]); // Emit a new copy of the petData array
    console.log(this.petData);
  }

  // Function to delete a pet
  deleteItem(index: number): void {
    if (index >= 0 && index < this.petData.length) {
      this.petData.splice(index, 1);
      this.petListChange.next([...this.petData]); // Emit a new copy of the petData array
      alert('Your pet has been successfully removed!!!!');
    }
  }

  // Function to set pets
  setPetList(petData: PetModel[]): void {
    this.petData = [...petData]; // Set the petData array with a new copy of the provided array
    this.petListChange.next([...this.petData]); // Emit a new copy of the petData array
  }

  // Functions related to favorites below here
  setFavoritePets(favoritePets: FavoritePetModel[]): void {
    this.petFavorites = [...favoritePets];
    this.petFavListChange.next([...this.petFavorites]);
  }

  addToFavorites(pet: PetModel): void {
    if (!this.petFavorites.some(fav => fav.id === pet.id)) {
      const favoritePet: FavoritePetModel = { ...pet, favoriteDate: new Date() };
      this.petFavorites.push(favoritePet);
      this.updateFavoritePetsOnServer(); // Update Firebase on adding a favorite
      this.petFavListChange.next([...this.petFavorites]);
    }
  }

  removeFromFavorites(pet: PetModel): void {
    this.petFavorites = this.petFavorites.filter(fav => fav.id !== pet.id);
    this.updateFavoritePetsOnServer(); // Update Firebase on removing a favorite
    this.petFavListChange.next([...this.petFavorites]);
  }

  private updateFavoritePetsOnServer(): void {
    this.http.put(
      'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json',
      this.petFavorites
    ).subscribe(response => {
      console.log('Favorite pets updated on Firebase:', response);
    });
  }

  getFavorites(): FavoritePetModel[] {
    return this.petFavorites;
  }
}
