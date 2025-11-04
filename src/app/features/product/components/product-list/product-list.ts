import {Component, computed, inject, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonFilter} from '../button-filter/button-filter';
import {ProductCard} from '../product-card/product-card';
import {ProductStore} from '../../services/product.store';
import {CartSummary} from '../../../cart/components/cart-summary/cart-summary';
import {CartStore} from '../../../cart/services/cart.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonFilter, ProductCard, CartSummary],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductList {
  cartItems: Product[] = [];
  favoriteIds: number[] = [];
  category = signal('');
  private productStore = inject(ProductStore)
  private cartStore = inject(CartStore);
  products = this.productStore.products;
  getInStockCount = this.productStore.getInStockCount()
  getTotalProducts = this.productStore.getTotalProducts()
  count = this.cartStore.count;

  // 👇 Méthode appelée par un output envoyé depuis l'enfant
  onProductAddedToFavorites(product: Product): void {
    this.favoriteIds.push(product.id);
    console.log(`${product.name} ajouté aux favoris !`);
  }

  // 👇 Méthode appelée par un output envoyé depuis l'enfant
  onProductRemovedFromFavorites(product: Product): void {
    this.favoriteIds = this.favoriteIds.filter(id => id !== product.id);
    console.log(`${product.name} retiré des favoris !`);
  }

  FiltreParCategorie = computed(() => {
    return this.category() !== ''
      ? this.products().filter(p => p.category === this.category())
      : this.products();
  })

  onChangeCategory(category: string): void {
    this.category.set(category);
    console.log(`${category || 'Reset'} est maintenant appliqué !`);
    console.log('Category:', category);
  }

  // Méthodes utilitaires
  isInFavorites(productId: number): boolean {
    return this.favoriteIds.includes(productId);
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  getFavoritesCount(): number {
    return this.favoriteIds.length;
  }
}
