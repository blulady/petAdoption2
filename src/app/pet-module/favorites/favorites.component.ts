import { Component, OnInit } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { FavoritePetModel } from 'src/app/pet-module/petmodel';
import { PetService } from 'src/app/pet-module/pet.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  myFavorites: FavoritePetModel[] = [];

  constructor(private petService: PetService, private router: Router, data: DataStorageFirebase) { }

  ngOnInit(): void {
    this.myFavorites = this.petService.getFavorites();
  }

   // Navigate to detail view
   goToDetail(id: number): void {
    this.router.navigate(['/pet', id]);
  }
}

