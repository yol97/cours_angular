import {Component, inject, input} from '@angular/core';
import {CartItem} from '../cart-item/cart-item';
import {CartStore} from '../../services/cart.store';
import {RouterLink} from '@angular/router';
import {CartFacade} from '../../services/cart.facade';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [
    CartItem,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss'
})
export class CartSummary {
  private cartFacade = inject(CartFacade);
  private cartStore = inject(CartStore);
  cart = this.cartStore.cart;
  total = this.cartStore.total;
  count = this.cartStore.count;
  onPage = input.required<boolean>();

  clearCart() {
    this.cartFacade.clearCart();
  }
}
