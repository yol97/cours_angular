import {Component, computed, effect, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {

  showRatingForm!: boolean;

  // 👇 Signal input
  product = input.required<Product>();

  // 👇 Outputs pour envoyer des événements au parent
  productAddedToCart = output<Product>();
  productAddedToFavorites = output<Product>();
  productRemovedFromFavorites = output<Product>();

  isFavorite = input<boolean>(false);

  // L'outil computed : calcul automatiquement réactif
  displayPrice = computed(() => {
    const p = this.product();
    return p.inStock ? `${p.price}€` : 'Prix indisponible';
  });

  /* inputSearch: string = "";
  title: string = "Adopt a Cat";
  price: number = 17;
  inStock: boolean = true;
  currentImage: string = "https://placekittens.com/200/300";
  imageAlt: string = "un chaton tout mignon";
  priceScam: number = this.price; // 17 */
  // Truthy : tout ce qui n'est pas FALSY
  // Qu'est-ce qui est FALSY ? 0, -0, "", null, undefined, NaN, false

  onAddToCart(): void {
    // 👇 Émettre l'événement vers le parent
    this.productAddedToCart.emit(this.product());
    console.log(`${this.product().name} produit ajouté panier a été envoyé au parent !`);
  }

  onToggleFavorite(): void {
    if (this.isFavorite()) {
      // 👇 Émettre l'événement vers le parent
      this.productRemovedFromFavorites.emit(this.product());
    } else {
      this.productAddedToFavorites.emit(this.product());
    }

    // L'outil effect : side-effect déclenché quand le produit change
    /* constructor() {
      effect(() => {
        console.log('Nouveau produit reçu :', this.product().name);
      });
    } */

  }
}

  /* constructor() { }

  onBuyClick(): void {
    console.log("inStock", this.inStock);
    this.inStock = !this.inStock; // true -> false || false -> true
    if (this.inStock) {
      this.priceScam += this.price;
    }
  }
} */
