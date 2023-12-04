// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { ExerciseService } from "../exercise-list/exercise.service";
// import { Exercise } from "./exercisemodel";


// @Injectable({providedIn: 'root'})
// export class DataStorageService {

//   constructor(private http: HttpClient,){}

// storeExercises() {
//   const myExercises = this.petService.getExercises();
//   this.http.put(
//     'https://exercise-project-49ee5-default-rtdb.firebaseio.com/exercises.json', myExercises)
//   .subscribe(response => {
//     console.log(response);
//   })
// }
// fetchExercises(){
//   this.http.get<Exercise[]>(
//     'https://exercise-project-49ee5-default-rtdb.firebaseio.com/exercises.json')
//   .subscribe(myExercises => {
//     this.exerciseService.setExercises(myExercises);
//   })
// }
// }
