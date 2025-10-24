import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductRules {
  /* static validate(dto: CreateProduct): void {
    if (dto.price <= 0) {
      throw new Error('Price must be greater than 0');
    }
    if (dto.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
  }

  static applyDiscount(price: number, percentage: number): number {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Discount must be between 0 and 100');
    }
    return price * (1 - percentage / 100);
  } */
}
