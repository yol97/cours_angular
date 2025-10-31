import {computed, Injectable, signal} from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  private productsSignal = signal<Product[]>([]);
  products = computed(() => this.productsSignal());

  setProducts(products: Product[]) {
    this.productsSignal.set(products);
  }

  add(product: Product): void {
    // On ajoute un produit au signal existant
    this.productsSignal.update(list => [...list, product]);
  }

  getTotalProducts(): number {
    return this.productsSignal().length;
  }

  getInStockCount(): number {
    return this.productsSignal().filter(p => p.inStock).length;
  }

  onNotationAdded(event: { productId: number; rating: number; }): void {
    console.log(`Nouvelle note ${event.rating} !`);
    const product = this.productsSignal().find(p => p.id === event.productId);

    if (!product) return;

    if (!product.reviews) {
      product.reviews = [product.rating];
    }

    product.reviews.push(event.rating);

    const total = product.reviews.reduce((sum, r) => sum + r, 0);
    const average = total / product.reviews.length;

    product.rating = parseFloat(average.toFixed(1));

    console.log(`Nouvelle note ajoutée pour ${product.name} : ${event.rating}/5 - Nouvelle moyenne : ${product.rating}/5`)
  }
}
