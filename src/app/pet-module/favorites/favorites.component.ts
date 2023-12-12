import { Component, OnInit } from '@angular/core';
import { FavoritePetModel } from '../petmodel';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  myFavorites: FavoritePetModel[] = [];

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.myFavorites = this.petService.getFavorites();
  }
}
