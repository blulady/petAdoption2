import { DataStorageFirebase } from '../shared/data-storage-firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home/home.component';
import { PetService } from '../pet-module/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(HomeComponent) homeComponent!: HomeComponent; // Reference to HomeComponent
  constructor(
    private data: DataStorageFirebase,
    private router: Router,
    private petService: PetService
  ) {}

  favoritesList: any[] = []; // Initialize as an empty array
  showFavorites: boolean = false;

  ngOnInit(): void {
   // Fetch favorites when the component initializes
    this.data.fetchFavPets();
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  reloadHomePage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }
}
