import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { PetModel } from './petmodel';
import { PetService } from './pet.service';


@Injectable({
    providedIn: 'root',
})


export class PetfinderApiService {
    singlePet: PetModel;
    petList: PetModel[] = [];
    token: string = '';

    readonly petfinderOAuthURL = 'https://api.petfinder.com/v2/oauth2/token';
    readonly petfinderURL = 'https://api.petfinder.com/v2/animals/';
    // https://api.petfinder.com/v2/animals/
    // https://api.petfinder.com/v2/animals/{id}


    tokenRequestBody = {
        "grant_type": "client_credentials",
        "client_id": environment.PETFINDER_CLIENT_ID,
        "client_secret": environment.PETFINDER_CLIENT_SECRET
    }

    constructor(
        private http: HttpClient,
        private petService: PetService
    ) {}

    getOAuthToken() {
        return this.http.post(this.petfinderOAuthURL, this.tokenRequestBody)
        .pipe(
            map(responseData => {
                let tokenArray = [];
                for (let val of Object.values(responseData)) {
                    tokenArray.push(val);
                }
                this.token = tokenArray[2];
                return this.token;
            })
        )
        // .subscribe();
    }

    getListOfPets(): void {
        this.http.get(this.petfinderURL)
        .subscribe((resData:any) => {
            this.petService.setPetList(resData.animals);
            console.log(this.petService.petData);
        })
    }

    getPetById(id: number) {
        this.http.get(`${this.petfinderURL}${id}`)
            .subscribe((resData:any) => {
                this.petService.setOnePet(resData.animal);
                // const foundPet = resData.animal;
                // console.log(foundPet)
                // return foundPet;
            })
        }

    getListOfPetsByType(type: string) {
        return this.http.get(`${this.petfinderURL}?type=${type}`)
    }
}
