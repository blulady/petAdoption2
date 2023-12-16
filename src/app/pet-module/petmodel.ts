export interface PetModel {
  id: number;
  name: string;
  species: string;
  description: string;
  photo: string;
  // Add other properties as needed
}
export interface FavoritePetModel extends PetModel {
  favoriteDate: Date;
  // Other properties specific to favorite pets
}
