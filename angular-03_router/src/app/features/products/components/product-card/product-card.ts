import {Component, computed, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Product} from '../../../product/models/product.model';
import {RouterLink} from '@angular/router';
import {NoteForm} from '../note-form/note-form';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, NoteForm, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  showRatingForm = false
  product = input.required<Product>();

// 👇 Outputs pour envoyer des événements au parent
  productAddedToCart = output<Product>();
  productAddedToFavorites = output<Product>();
  productRemovedFromFavorites = output<Product>();

  notationAdded = output<{ productId: number, rating: number }>();

  handleClickShowRatingForm() {
    this.showRatingForm = !this.showRatingForm
  }

  isFavorite = input<boolean>(false);

  onAddToCart(): void {
    // 👇 Émettre l'événement vers le parent
    this.productAddedToCart.emit(this.product());
  }

  onToggleFavorite(): void {
    if (this.isFavorite()) {
      // 👇 Émettre l'événement vers le parent
      this.productRemovedFromFavorites.emit(this.product());
    } else {
      // 👇 Émettre l'événement vers le parent
      this.productAddedToFavorites.emit(this.product());
    }
  }

  // L'outil computed : calcul automatiquement réactif
  displayPrice = computed(() => {
    const p = this.product();
    return p.inStock ? `${p.price}€` : 'Prix indisponible';
  });

  onSubmitNotation(event: { id: number, rating: number }) {
    this.notationAdded.emit({productId: event.id, rating: event.rating})
    this.showRatingForm = false;
  }
}
