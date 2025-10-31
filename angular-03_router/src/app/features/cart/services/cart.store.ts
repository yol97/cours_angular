import {computed, Injectable, signal} from '@angular/core';
import {Product} from '../../product/models/product.model';
import {CartItemModel as CartItem} from '../models/cart-item.model';

@Injectable({providedIn: 'root'})
export class CartStore {
  count = computed(() => this.cart().length);
  cart = computed(() => this.cartSignal());
  total = computed(() => this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
  private cartSignal = signal<CartItem[]>([]);

  addToCart = (product: Product) => {

    this.cartSignal.update(items => {
      if (items.some(item => item.product.id === product.id)) {
        items.map(item => item.product.id === product.id ?
          item.quantity = item.quantity + 1
          : item
        )
      } else {
        items = [...items, {product, quantity: 1}]
      }
      return items
    });
  }

  removeToCart(id: number) {
    this.cartSignal.update(items => items.filter(item => item.product.id !== id));
  }

  clearCart() {
    this.cartSignal.set([]);
  }

  incrementQuantity = (CartItem: CartItem) => {
    this.cartSignal.update(item => item.map(item => item.product.id === CartItem.product.id ? {
      ...item,
      quantity: item.quantity + 1
    } : item))
  }

  decrementQuantity = (CartItem: CartItem) => {
    this.cartSignal.update(item => item.map(item => item.product.id === CartItem.product.id ? {
      ...item,
      quantity: item.quantity - 1
    } : item))
  }
}
