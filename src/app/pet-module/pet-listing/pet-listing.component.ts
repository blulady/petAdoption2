import { Component, OnInit } from '@angular/core';
import { DataStorageFirebase } from 'src/app/shared/data-storage-firebase.service';
import { PetService } from '../pet.service';
import { petModel } from '../petmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.css']
})
export class PetListingComponent implements OnInit {
  petData: petModel[] = [];


  constructor(private data: DataStorageFirebase, private petService: PetService, private router: Router){}
//   ngOnInit(): void {
//   this.data.fetchPets();
//   console.log(this.data.fetchPets())
// }

ngOnInit(): void{
this.data.fetchPets();
this.petService.petListChange.subscribe((pets: petModel[]) => {
  this.petData = pets;
})
}
goToDetail(id: number) {
  this.router.navigate(['/pet', id]);
}
}
