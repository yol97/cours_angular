// .../domain/product.rules.ts
import { Product } from '../models/product.model';

export class ProductRules {
  static applyDiscount(product: Product, percentage: number): Product {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Discount must be between 0 and 100');
    }
    return { ...product, price: product.price * (1 - percentage / 100) };
  }

  static canBeOrdered(product: Product): boolean {
    return product.stock > 0 && product.active && product.price > 0;
  }

  static validate(product: Omit<Product, 'id'>): void {
    if (product.price <= 0) throw new Error('Price must be greater than 0');
    if (product.stock < 0) throw new Error('Stock cannot be negative');
  }
}
