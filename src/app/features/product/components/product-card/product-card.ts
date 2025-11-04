import {Component, computed, inject, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Product} from '../../models/product.model';
import {RouterLink} from '@angular/router';
import {NoteForm} from '../note-form/note-form';
import {ProductStore} from '../../services/product.store';
import {CartFacade} from '../../../cart/services/cart.facade';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, NoteForm, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  showRatingForm = false
  product = input.required<Product>();
  localProduct = computed(() => this.productStore.products().find(p => p.id === this.product().id));

  productStore:ProductStore = inject(ProductStore);
  cartFacade = inject(CartFacade);

  // 👇 Outputs pour envoyer des événements au parent
  productAddedToFavorites = output<Product>();
  productRemovedFromFavorites = output<Product>();

  notationAdded = output<{ productId: number, rating: number }>();

  handleClickShowRatingForm() {
    this.showRatingForm = !this.showRatingForm
  }

  isFavorite = input<boolean>(false);

  async onAddToCart(): Promise<void> {
    // 👇 Émettre l'événement vers le parent
    this.cartFacade.addToCart(this.product());
  }

  onToggleFavorite(): void {
    if (this.isFavorite()) {
      // 👇 Émettre l'événement vers le parent
      this.productRemovedFromFavorites.emit(this.product());
      console.log("Produit retiré de l'enfant ", this.productAddedToFavorites);
    } else {
      // 👇 Émettre l'événement vers le parent
      this.productAddedToFavorites.emit(this.product());
      console.log("Produit ajouté de l'enfant ", this.productAddedToFavorites);
    }
  }

  // L'outil computed : calcul automatiquement réactif
  displayPrice = computed(() => {
    const p = this.product();
    return p.inStock ? `${p.price}€` : 'Prix indisponible';
  });

  onSubmitNotation(event: { id: number, rating: number }) {
    this.productStore.onNotationAdded({productId: event.id, rating: event.rating})
    this.showRatingForm = false;
  }
}
