import { Component } from '@angular/core';
import { PetService } from 'src/app/pet-module/pet.service';
const catData = [
  { name: 'Tabby', description: 'A crazy feline', species: 'cat', img: 'https://i.pinimg.com/736x/b0/3c/be/b03cbeaded6326b85d1edb86c91caa59.jpg' },
  { name: 'Twinkels', description: 'is a large hairless cat', species: 'cat',  img: 'https://justintadlock.com/user/media/2023/07/twinkle-cat-bed.webp' },
  { name: 'Tabby', description: 'A crazy feline', species: 'cat', img: 'https://i.pinimg.com/736x/b0/3c/be/b03cbeaded6326b85d1edb86c91caa59.jpg' },
  { name: 'Twinkels', description: 'is a large hairless cat', species: 'cat',  img: 'https://justintadlock.com/user/media/2023/07/twinkle-cat-bed.webp' },
  { name: 'Tabby', description: 'A crazy feline', species: 'cat', img: 'https://i.pinimg.com/736x/b0/3c/be/b03cbeaded6326b85d1edb86c91caa59.jpg' },
  { name: 'Twinkels', description: 'is a large hairless cat', species: 'cat',  img: 'https://justintadlock.com/user/media/2023/07/twinkle-cat-bed.webp' },

];

const dogData = [
  { name: 'Spot', description: 'Is a good boy', species: 'dog', img: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_700,h_467/https://puppyintraining.com/wp-content/uploads/Black-and-White-Dog-Names-700x467.jpg' },
  { name: 'Rufus', description: 'Is a bad boy', species: 'dog',  img: 'https://www.rocketdogrescue.org/wp-content/uploads/2018/06/IMG_9025-1.jpg' },
  { name: 'Nolan', description: 'Is a genius dog', species: 'dog', img: 'https://thevillagevets.com/wp-content/uploads/2022/10/most-intelligent-dog-breeds-atlanta-ga.jpg'},
  // Add more dog data as needed{ name: 'Spot', description: 'Is a good boy', species: 'dog', img: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_700,h_467/https://puppyintraining.com/wp-content/uploads/Black-and-White-Dog-Names-700x467.jpg' },
  { name: 'Rufus', description: 'Is a bad boy', species: 'dog',  img: 'https://www.rocketdogrescue.org/wp-content/uploads/2018/06/IMG_9025-1.jpg' },
  { name: 'Nolan', description: 'Is a genius dog', species: 'dog', img: 'https://thevillagevets.com/wp-content/uploads/2022/10/most-intelligent-dog-breeds-atlanta-ga.jpg'},
  { name: 'Spot', description: 'Is a good boy', species: 'dog', img: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_700,h_467/https://puppyintraining.com/wp-content/uploads/Black-and-White-Dog-Names-700x467.jpg' },
  { name: 'Rufus', description: 'Is a bad boy', species: 'dog',  img: 'https://www.rocketdogrescue.org/wp-content/uploads/2018/06/IMG_9025-1.jpg' },
  { name: 'Nolan', description: 'Is a genius dog', species: 'dog', img: 'https://thevillagevets.com/wp-content/uploads/2022/10/most-intelligent-dog-breeds-atlanta-ga.jpg'},
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private petService: PetService){}
  animalsToShow: any[] = []; // Initialized as empty array
  showButtons: boolean = true;

  // Function to display cats
  showCats() {

    this.animalsToShow = catData;

    this.showButtons = false; // Hide buttons
  }

  // Function to display dogs
  showDogs() {
    this.animalsToShow = dogData;
    this.showButtons = false; // Hide buttons
  }
}
