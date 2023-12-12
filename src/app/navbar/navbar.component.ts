import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageFirebase } from '../shared/data-storage-firebase.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
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

  fetchFavorites(): void {
    this.data.fetchFavPets();
    // Subscribe to updates in the favorites list
    this.petService.petFavListChange.subscribe((favorites: any[]) => {
      this.favoritesList = favorites;
    });
export class NavbarComponent  implements OnInit, OnDestroy {
  constructor(private data: DataStorageFirebase,
              private authService: AuthService,
              private router: Router){}
  isAuthenticated = false;
  private userSub!: Subscription;

  ngOnInit(): void {
     this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;

     }
     );
  }
  getData(){
    this.data.storePets();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
}


}
