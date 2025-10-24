// src/app/features/products/pages/product-detail.page.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../product/models/product.model';
import {ProductCard} from '../components/product-card/product-card';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    ProductCard
  ],
  template: `
    <p>ID du produit : {{ product.id }}</p>
    <app-product-card [product]="product"></app-product-card>
  `
})
export default class ProductDetailPage {
  private route = inject(ActivatedRoute);
  product: Product = this.route.snapshot.data['product'] as Product;
}
