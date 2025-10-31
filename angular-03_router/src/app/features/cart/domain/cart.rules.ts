import { Product } from '../../product/models/product.model';
import { Injectable } from '@angular/core';
import { CartItemModel as CartItem } from '../models/cart-item.model';

export type RuleResult =
  | { ok: true }
  | { ok: false; message: string };

@Injectable({ providedIn: 'root' })
export class CartRules {

  // ✅ Ajout d'un produit dans le panier
  static addValidator(cart: CartItem[], product: Product, total: number): RuleResult {
    if (!product.id) {
      return { ok: false, message: 'Produit sans identifiant.' };
    }
    if (product.stock <= 0) {
      return { ok: false, message: 'Stock épuisé.' };
    }
    const existing = cart.find(i => i.product.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      return { ok: false, message: 'Quantité maximale atteinte pour ce produit.' };
    }
    if (product.price < 0) {
      return { ok: false, message: 'Prix du produit invalide.' };
    }
    if (total > 5000) {
      return { ok: false, message: 'Montant total du panier > 5000 €.' };
    }
    return { ok: true };
  }

  // ✅ Retrait d'un produit du panier
  static removeValidator(cart: CartItem[], id: number): RuleResult {
    const exists = cart.some(item => item.product.id === id);
    if (!exists) {
      return { ok: false, message: 'Produit non trouvé dans le panier.' };
    }
    return { ok: true };
  }

  // ✅ Vérifie si le montant total est inférieur ou égal à 5000
  static limitMaxValidator(total: number): RuleResult {
    if (total > 5000) {
      return { ok: false, message: 'Montant total du panier > 5000 €.' };
    }
    return { ok: true };
  }

  // ✅ Vérifie si le montant total est ≥ 0
  static limitMinValidator(total: number): RuleResult {
    if (total < 0) {
      return { ok: false, message: 'Montant total du panier < 0 €.' };
    }
    return { ok: true };
  }

  // ✅ Mise à jour de la quantité d’un produit
  static updateQuantityValidator(cart: CartItem[], product: Product, newQuantity: number): RuleResult {
    const existing = cart.find(i => i.product.id === product.id);
    if (!existing) {
      return { ok: false, message: 'Produit non trouvé dans le panier.' };
    }
    if (newQuantity <= 0) {
      return { ok: false, message: 'Quantité doit être supérieure à 0.' };
    }
    if (newQuantity > product.stock) {
      return { ok: false, message: 'Quantité dépasse le stock disponible.' };
    }
    return { ok: true };
  }

  // ✅ Mise à jour d’un produit via son identifiant (autre forme)
  static updateValidator(cart: CartItem[], productId: number, quantity: number): RuleResult {
    const item = cart.find(i => i.product.id === productId);
    if (!item) {
      return { ok: false, message: 'Produit introuvable dans le panier.' };
    }
    if (quantity <= 0) {
      return { ok: false, message: 'Quantité invalide (≤ 0).' };
    }
    if (quantity > item.product.stock) {
      return { ok: false, message: 'Quantité supérieure au stock disponible.' };
    }
    return { ok: true };
  }

  // ✅ Validation avant passage en caisse
  static checkoutValidator(cart: CartItem[], total: number): RuleResult {
    if (cart.length === 0) {
      return { ok: false, message: 'Panier vide.' };
    }
    if (cart.some(i => !i.product.id)) {
      return { ok: false, message: 'Produit invalide dans le panier.' };
    }
    if (total > 5000) {
      return { ok: false, message: 'Montant total du panier > 5000 €.' };
    }
    return { ok: true };
  }

}
