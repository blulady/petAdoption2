import { Component, OnInit } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { FavoritePetModel, PetModel } from 'src/app/pet-module/petmodel';
import { PetService } from 'src/app/pet-module/pet.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  //array for myfavorites to exist outside of firebase
  myFavorites: FavoritePetModel[] = [];

  constructor(private petService: PetService, private router: Router, private data: DataStorageFirebase) { }

  ngOnInit(): void {
    //grabs myfavorites from firebase
    this.myFavorites = this.petService.getFavorites();
  }

   // Navigate to detailed view by pet ID
   goToDetail(id: number): void {
    this.router.navigate(['/pet', id]);
  }
  //removefavorite works with toggle functionality also removes from firebase
  removeFavorite(pet: PetModel): void {
    this.petService.removeFromFavorites(pet);
    // Update the list of favorites after removal
    this.myFavorites = this.petService.getFavorites();
  }
}

