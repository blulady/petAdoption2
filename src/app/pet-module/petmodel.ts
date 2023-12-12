
export interface PetModel {
  name: string;
  species: string;
  description: string;
  postcode: number;
  id: number;
  photo: string;
}
export interface FavoritePetModel extends PetModel {
  favoriteDate: Date;
  // Other properties specific to favorite pets
}
