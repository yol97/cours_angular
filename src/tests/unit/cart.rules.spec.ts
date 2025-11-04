import { Product } from '../../app/features/product/models/product.model';
import { CartRules } from '../../app/features/cart/domain/cart.rules';
import { CartItemModel as CartItem } from '../../app/features/cart/models/cart-item.model';

describe('CartRules (extended unit tests)', () => {
  let product: Product;
  let cart: CartItem[];

  beforeEach(() => {
    product = {
      id: 1,
      name: 'The Witcher 3',
      description: 'Une description',
      active: true,
      price: 50,
      imageUrl: 'http://test.com',
      category: 'Gaming',
      inStock: true,
      stock: 5,
      rating: 4
    };
    cart = [];
  });

  // --- ADD ---
  it('should throw if product has no id', () => {
    const result = CartRules.addValidator(cart, { ...product, id: undefined as any }, 0);
    expect(!result.ok && result.message).toBe('Produit sans identifiant.');
  });

  it('should throw if quantity is zero (stock=0)', () => {
    const result = CartRules.addValidator(cart, { ...product, stock: 0 }, 0);
    expect(!result.ok && result.message).toBe('Stock épuisé.');
  });

  it('should not allow adding more than stock', () => {
    cart.push({ product, quantity: 5 });
    const result = CartRules.addValidator(cart, product, 100);
    expect(!result.ok && result.message).toBe('Quantité maximale atteinte pour ce produit.');
  });

  it('should throw if price is negative', () => {
    const result = CartRules.addValidator(cart, { ...product, price: -10 }, 0);
    expect(!result.ok && result.message).toBe('Prix du produit invalide.');
  });

  it('should not exceed max cart total', () => {
    const result = CartRules.addValidator(cart, product, 6000);
    expect(!result.ok && result.message).toBe('Montant total du panier > 5000 €.');
  });

  it('should allow adding product when valid', () => {
    const result = CartRules.addValidator(cart, product, 100);
    expect(result.ok).toBeTrue();
  });

  // --- REMOVE ---
  it('should throw when removing non-existing product', () => {
    const result = CartRules.removeValidator(cart, 999);
    expect(!result.ok && result.message).toBe('Produit non trouvé dans le panier.');
  });

  it('should remove product when existing', () => {
    cart.push({ product, quantity: 2 });
    const result = CartRules.removeValidator(cart, 1);
    expect(result.ok).toBeTrue();
  });

  // --- UPDATE ---
  it('should throw if updating quantity <= 0', () => {
    cart.push({ product, quantity: 2 });
    const result = CartRules.updateValidator(cart, 1, 0);
    expect(!result.ok && result.message).toBe('Quantité invalide (≤ 0).');
  });

  it('should throw if updating quantity > stock', () => {
    cart.push({ product, quantity: 2 });
    const result = CartRules.updateValidator(cart, 1, 10);
    expect(!result.ok && result.message).toBe('Quantité supérieure au stock disponible.');
  });

  it('should throw if updating non-existing product', () => {
    const result = CartRules.updateValidator(cart, 999, 2);
    expect(!result.ok && result.message).toBe('Produit introuvable dans le panier.');
  });

  it('should update quantity when valid', () => {
    cart.push({ product, quantity: 2 });
    const result = CartRules.updateValidator(cart, 1, 3);
    expect(result.ok).toBeTrue();
  });

  // --- CHECKOUT ---
  it('should throw if cart is empty at checkout', () => {
    const result = CartRules.checkoutValidator([], 0);
    expect(!result.ok && result.message).toBe('Panier vide.');
  });

  it('should throw if cart has invalid product', () => {
    const invalid = { ...product, id: undefined as any };
    const result = CartRules.checkoutValidator([{ product: invalid, quantity: 1 }], 100);
    expect(!result.ok && result.message).toBe('Produit invalide dans le panier.');
  });

  it('should throw if cart total exceeds max', () => {
    cart.push({ product, quantity: 2 });
    const result = CartRules.checkoutValidator(cart, 6000);
    expect(!result.ok && result.message).toBe('Montant total du panier > 5000 €.');
  });

  it('should allow checkout when cart is valid', () => {
    cart.push({ product, quantity: 2 });
    const result = CartRules.checkoutValidator(cart, 100);
    expect(result.ok).toBeTrue();
  });
});
