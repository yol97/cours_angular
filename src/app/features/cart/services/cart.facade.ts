// features/cart/services/cart.facade.ts
import {inject, Injectable} from '@angular/core';
import {CartStore} from './cart.store';
import {NotificationService} from '../../../shared/services/notification.service';
import {CartRules} from '../domain/cart.rules';
import {Product} from '../../product/models/product.model';
import {CartApi} from './cart.api';
import {CartItemModel} from '../models/cart-item.model';
import {CartItem} from '../components/cart-item/cart-item';

@Injectable({providedIn: 'root'})
export class CartFacade {
  private cartApi = inject(CartApi);
  private cartStore = inject(CartStore);
  cart = this.cartStore.cart;
  total = this.cartStore.total;
  private success = inject(NotificationService).showSuccess
  private error = inject(NotificationService).showError

  addToCart(item: Product): void {
    console.log("add to card")
    const res = CartRules.addValidator(this.cart(), item, this.total());
    if (!res.ok) {
      this.error(res.message);
      return;
    }
    this.cartApi.addToCart(item);
    this.cartStore.addToCart((item))
    this.success('Produit ajouté avec succès 🎉');
  }

  removeToCart(id: number): void {
    if (!CartRules.removeValidator(this.cart(), id))
      this.error("Déjà supprimé du panier !")

    this.cartApi.deleteToCart(id);
    this.cartStore.removeToCart(id);
    this.success("Produit supprimé du panier !")
  }

  clearCart(): void {
    this.cartApi.clearCart();
    this.cartStore.clearCart();
    this.success("Panier vidé !")
  }

  incrementQuantity = (cartItem: CartItemModel): void => {
    if (!CartRules.limitMaxValidator(this.total())) {
      this.error("Vous ne pouvez pas en ajouter plus !")
      return
    }
    this.cartStore.incrementQuantity(cartItem)
  }

  decrementQuantity = (cartItem: CartItemModel): void => {
    if (!CartRules.limitMinValidator(this.total())) {
      this.error("Vous ne pouvez pas en enlever moins !")
      return
    }
    this.cartStore.decrementQuantity(cartItem)
  }

  validateCheckout = (cart: CartItem[]): boolean => {
    return cart.length > 0
  }
}
