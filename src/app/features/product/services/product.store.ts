// product.store.ts
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

    if (!product.reviews || product.reviews.length === 0) {
      // on part d'un tableau vide (note initiale de 4.9 par exemple sur un article au début)
      product.reviews = [Number(product.rating)];   // on convertit string "4.9" => number
    }

    product.reviews.push(event.rating);   // on ajoute la nouvelle note

    // 👇 on convertit encore le string r => Number(r)
    const total = product.reviews.reduce((sum, r) => sum + Number(r), 0);
    console.log(`Total: ${total} reviews`);
    const average = total / product.reviews.length;

    product.rating = parseFloat(average.toFixed(1));

    console.log(`Nouvelle note ajoutée pour ${product.name} : ${event.rating}/5 - Nouvelle moyenne : ${product.rating}/5`)
  }
}
