import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../../product/models/product.model';

@Injectable({providedIn: 'root'})
export class CartApi extends BaseApi {
  //private readonly endpoint = '';

  getCart() {
    // return this.get<Cart[]>(this.endpoint);
    console.log("api get cart")
  }

  addToCart(item: Product) {
    //return this.post<Cart>(this.endpoint, cart);
    console.log("api add item to cart")
  }

  deleteToCart(id: number) {
    //return this.delete<void>(`${this.endpoint}/${id}`);
    console.log("api delete item to cart")
  }

  clearCart() {
    //return this.post<Cart>(this.endpoint, cart);
    console.log("api clear cart")
  }
}
