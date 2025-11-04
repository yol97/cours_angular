import {Component, inject, input} from '@angular/core';
import {CartFacade} from '../../services/cart.facade';
import {CartItemModel as CartItem} from '../../models/cart-item.model';

@Component({
  selector: 'app-quantity',
  imports: [],
  templateUrl: './quantity.html',
  styleUrl: './quantity.scss'
})
export class Quantity {
  cartItem = input.required<CartItem>();
  increment = inject(CartFacade).incrementQuantity;
  decrement = inject(CartFacade).decrementQuantity;

}
