import { DataStorageFirebase } from '../shared/data-storage-firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home/home.component';
import { PetService } from '../pet-module/pet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  favoritesList: any[] = []; // Initialize as an empty array
  @ViewChild(HomeComponent) homeComponent: HomeComponent | undefined;
  showFavorites: boolean = false;
  favorites: any[] = []; // Assuming fetched favorites are stored here

  constructor(private data: DataStorageFirebase, private petService: PetService) {}

  ngOnInit(): void {
    // Fetch favorites when the component initializes
    this.fetchFavorites();
  }
  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }
  resetHomeView(): void {
    if (this.homeComponent) {
      this.homeComponent.resetView();
    }
  }
  fetchFavorites(): void {
    this.data.fetchFavPets();
    // Subscribe to updates in the favorites list
    this.petService.petFavListChange.subscribe((favorites: any[]) => {
      this.favoritesList = favorites;
    });
  }
}
