import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PetService } from "../pet-module/pet.service";
import { PetModel, FavoritePetModel } from '../pet-module/petmodel';
import { Observable } from "rxjs";
import { take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn: 'root'})
export class DataStorageFirebase {
  private firebaseUrl = 'https://petadoption-9abd7-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient, private petService: PetService, private authService: AuthService){}

// storePets() {
//   const petList = this.petService.getPets();
//   this.http.put(
//     'https://petadoption-9abd7-default-rtdb.firebaseio.com/pets.json', petList
//     ).subscribe(response => {
//       console.log('Pets stored on Firebase:', response);
//     });
// }
  // Method to store a single pet in Firebase
  storePet(newPet: PetModel): Observable<any> {
    const url = `${this.firebaseUrl}/pets.json`; // Adjust the endpoint URL as needed
    return this.http.post(url, newPet);
  }
fetchPets(){
  this.http.get<PetModel[]>(
    'https://petadoption-9abd7-default-rtdb.firebaseio.com/pets.json'
  ).subscribe(petList => {
    this.petService.setPetList(petList);
  })
}
fetchFavPets() {
  this.http.get<FavoritePetModel[]>(
    'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json'
  ).subscribe(favPetList => {
    this.petService.setFavoritePets(favPetList);
  });
}
// fetchFavPets() {
//   this.authService.user.pipe(take(1), exhaustMap( user => {
//     return this.http.get<FavoritePetModel[]>(
//       'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json?auth=' + user.token)},
    // )).subscribe(favPetList => {
    // this.petService.setFavoritePets(favPetList);
    // console.log(favPetList);

//   });
// }
  // fetchFavPets() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       if (!user) {
  //         throw new Error('User not authenticated');
  //       }
  //       return this.http.get<FavoritePetModel[]>(
  //         'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json?auth=' +
  //           user.token
  //       );
  //     })
  //   ).subscribe(
  //     (favPetList) => {
  //       this.petService.setFavoritePets(favPetList);
  //     },
  //     (error) => {
  //       console.log(error);
  //       // Handle error
  //     }
  //   );
  // }
// does have user
//   fetchFavPets() {
//     return this.authService.user.pipe(
//       take(1),
//       exhaustMap((user) => {
//         if (!user) {
//           throw new Error('User not authenticated');
//         }
//         return this.http.get<FavoritePetModel[]>(
//           'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json?auth=' +
//             user.token
//         );
//       })
//     ).subscribe(response => {
//       this.petService.setFavoritePets(response);
//       console.log(response);},
//       (error) => {
//         console.log(error);
//         // Handle error
//       }
//     );
//   }
//   fetchFavPets() {
//   return this.authService.user.pipe(take(1), exhaustMap( user => {
//     const authToken = user.token;
//     return this.http.get<FavoritePetModel[]>(
//       'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json?auth=' + authToken
//     );
//   })).subscribe(favPetList => {
//     this.petService.setFavoritePets(favPetList);
//   });
// }
// fetchFavPets() {
//   return this.authService.user.pipe(take(1), exhaustMap( user => {
//     const authToken = user.token;
//     return this.http.get<FavoritePetModel[]>(
//       'https://petadoption-9abd7-default-rtdb.firebaseio.com/favorites.json?auth=' + authToken
//     );
//   })).subscribe(response => {
//     this.petService.setFavoritePets(response);
//   });
// }


updatePet(updatedPet: PetModel): Observable<any> {
  const url = `${this.firebaseUrl}/pets/${updatedPet.id}.json`; // Endpoint URL for updating a specific pet
  return this.http.put(url, updatedPet);
}
}
