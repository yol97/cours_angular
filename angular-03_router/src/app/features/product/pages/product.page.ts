import {Component, inject} from '@angular/core';
import {ProductList} from "../components/product-list/product-list";
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-product-page',
  imports: [ProductList],
  template: `
    <app-product-list></app-product-list>
  `,
  styles: ``
})
export default class ProductPage {
  // Route actuelle
  private route = inject(ActivatedRoute);
  // le resolver à stocké sa valeur de retour dans "products" de la route actuelle
  // On met ça dans une propriété "products" de CE composant
  // et pour l'instant... on n'en fait pas grand chose de plus.
  products: Product[] = this.route.snapshot.data['products'];
}
