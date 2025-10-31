import {Component} from '@angular/core';
import {CartSummary} from '../components/cart-summary/cart-summary';

@Component({
  selector: 'app-cart.page',
  imports: [
    CartSummary
  ],
  template: `
    <div>
      <h1>Mon panier</h1>
      <p>Voici le contenu de votre panier :</p>
      <app-cart-summary [onPage]="true"></app-cart-summary>
    </div>
  `,
  styles: `div {
    width: 60%;
    margin: 0 auto
  }`
})
export default class CartPage {

}
