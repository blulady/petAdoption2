import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataStorageFirebase } from '../shared/data-storage-firebase.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PetService } from '../pet-module/pet.service';
import { HomeComponent } from '../home/home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(HomeComponent) homeComponent!: HomeComponent; // Reference to HomeComponent
  constructor(
    private data: DataStorageFirebase,
    private authService: AuthService,
    private router: Router,
    private petService: PetService
  ) {}

  isAuthenticated = false;
  private userSub!: Subscription;
  favoritesList: any[] = []; // Initialize as an empty array
  showFavorites: boolean = false;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

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

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
