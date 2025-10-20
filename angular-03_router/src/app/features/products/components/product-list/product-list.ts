import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductCard} from '../product-card/product-card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCard, ReactiveFormsModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductList implements OnInit {
  products: Product[] = [];
  cartItems: Product[] = [];
  favoriteIds: number[] = [];
  isLoading: boolean = false;
  category = signal('');

  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.products = this.route.snapshot.data['products'];
  }

  // 👇 Méthode appelée par un output envoyé depuis l'enfant
  onProductAddedToCart(product: Product): void {
    this.cartItems.push(product);
    console.log(`${product.name} ajouté au panier !`);
    console.log(`Panier: ${this.cartItems.length} articles`);
  }

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
      ? this.products.filter(p => p.category === this.category())
      : this.products;
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

  getTotalProducts(): number {
    return this.products.length;
  }

  getInStockCount(): number {
    return this.products.filter(p => p.inStock).length;
  }

  onNotationAdded(event: { productId: number; rating: number; }): void {
    console.log(`Nouvelle note ${event.rating} !`);
    const product = this.products.find(p => p.id === event.productId);

    if (!product) return;

    if (!product.reviews) {
      product.reviews = [product.rating];
    }

    product.reviews.push(event.rating);

    const total = product.reviews.reduce((sum:number, r:number) => sum + r, 0);
    const average = total / product.reviews.length;

    product.rating = parseFloat(average.toFixed(1));

    console.log(`Nouvelle note ajoutée pour ${product.name} : ${event.rating}/5 - Nouvelle moyenne : ${product.rating}/5`)
  }
}
