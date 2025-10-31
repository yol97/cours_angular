import {Component, inject, input} from '@angular/core';
import {CartFacade} from '../../services/cart.facade';
import {CartItemModel} from '../../models/cart-item.model';
import {Quantity} from '../quantity/quantity';

@Component({
  selector: 'app-cart-item',
  imports: [
    Quantity
  ],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItem {
  cartItem = input.required<CartItemModel>();
  private cartFacade = inject(CartFacade);

  removeItem(id: number) {
    this.cartFacade.removeToCart(id)
  }
}
