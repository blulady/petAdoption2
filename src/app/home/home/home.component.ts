import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PetService } from 'src/app/pet-module/pet.service';
import { PetfinderApiService } from 'src/app/pet-module/petfinder-api.service';
import { FavoritePetModel, PetModel } from 'src/app/pet-module/petmodel';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animalsToShow: PetModel[] = [];
  showButtons: boolean = true;

  constructor(
    private data: DataStorageFirebase,
    private petService: PetService,
    private petfinderApiService: PetfinderApiService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showButtons = event.url === '/home';
      });
  }

  ngOnInit(): void {
    this.petfinderApiService.getListOfPets();
    this.petService.petListChange.subscribe((pets: PetModel[]) => {
      this.animalsToShow = pets;
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/pet', id]);
  }

  toggleFavorite(pet: PetModel): void {
    if (this.isFavorite(pet)) {
      this.petService.removeFromFavorites(pet);
    } else {
      const favoritePet: FavoritePetModel = { ...pet, favoriteDate: new Date() };
      this.petService.addToFavorites(favoritePet);
    }
  }

  isFavorite(pet: PetModel): boolean {
    return this.petService.getFavorites().some(fav => fav.id === pet.id);
  }

  showCats(): void {
    this.petfinderApiService.getListOfPetsByType('cat').subscribe((response: any) => {
      this.animalsToShow = response.animals;
      this.showButtons = false;
    });
  }

  showDogs(): void {
    this.petfinderApiService.getListOfPetsByType('dog').subscribe((response: any) => {
      this.animalsToShow = response.animals;
      this.showButtons = false;
    });
  }

  navigateToHome(): void {
    this.showButtons = true;
    this.router.navigate(['/home']);
  }
}
