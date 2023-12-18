import { Injectable } from '@angular/core';
import { FavoritePetModel, PetModel } from './petmodel';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PetService {

  petSelected = new Subject<PetModel>();
  petListChange = new Subject<PetModel[]>();
  petFavSelected = new Subject<FavoritePetModel>();
  petFavListChange = new Subject<FavoritePetModel[]>();
  petFavorites: FavoritePetModel[] = [];

  onePet: PetModel;

  public petData: PetModel[] = [
    //now is populating below information via firebase api
    // new petModel('Spot', 'Is a good boy', 'dog', 123, 1, 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_700,h_467/https://puppyintraining.com/wp-content/uploads/Black-and-White-Dog-Names-700x467.jpg' ),
    // new petModel('Rufus', 'Is a bad boy', 'dog', 124, 2, 'https://www.rocketdogrescue.org/wp-content/uploads/2018/06/IMG_9025-1.jpg' ),
    // new petModel('Tabby', 'A crazy feline', 'cat', 125, 3, 'https://i.pinimg.com/736x/b0/3c/be/b03cbeaded6326b85d1edb86c91caa59.jpg' ),
    // new petModel('Nolan', 'Is a genius dog', 'dog', 126, 4, 'https://thevillagevets.com/wp-content/uploads/2022/10/most-intelligent-dog-breeds-atlanta-ga.jpg' ),
    // new petModel('Twinkles', 'Is a large hairless cat', 'cat', 127, 5, 'https://justintadlock.com/user/media/2023/07/twinkle-cat-bed.webp' ),
  ]

  constructor(private http: HttpClient) {} // Inject HttpClient here
 //function to return petData array of pets

 getPets(): PetModel[] {
  return this.petData;
}
  //function to create a new pet
  addPet(pet: PetModel) {
   this.petData.push(pet);
   this.petListChange.next([...this.petData]); // Emit a new copy of the petData array
}
 //function to delete a pet
 deletePet(pet: PetModel): void {
  const index = this.petData.findIndex(p => p.id === pet.id);
  if (index !== -1) {
    this.petData.splice(index, 1);
    this.petListChange.next([...this.petData]);
    alert('Your pet has been successfully removed!');
  }
}

   // Function to set pets
   setPetList(petData: PetModel[]): void {
    this.petData = [...petData]; // Set the petData array with a new copy of the provided array
    this.petListChange.next([...this.petData]); // Emit a new copy of the petData array
  }

  setOnePet(pet: PetModel) {
    this.onePet = pet;
    this.petSelected.next(pet);
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


