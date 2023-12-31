import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home/home.component';
import { PetService } from '../pet-module/pet.service';
import { DataStorageFirebase } from '../shared/data-storage-firebase.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit, OnDestroy {
  @ViewChild(HomeComponent) homeComponent!: HomeComponent; // Reference to HomeComponent
  constructor(private data: DataStorageFirebase,
              private authService: AuthService,
              private router: Router,
              private petService: PetService){}
  favoritesList: any[] = []; // Initialize as an empty array
  showFavorites: boolean = false;
  isAuthenticated = false;
  private userSub!: Subscription;

  ngOnInit(): void {
     // Fetch favorites when the component initializes
     //Nolan said "I would have it exist in the favorites component. You can preload that component in the module"
     this.data.fetchFavPets();

     this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
     });
  }

  //multi step bug fixed but from when cat/dog buttons are clicked home page wouldn't display right
  reloadHomePage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
  });}

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
}


}
