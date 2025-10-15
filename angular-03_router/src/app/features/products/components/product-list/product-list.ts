import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  //imports: [CurrencyPipe, RouterLink],
  imports: [CommonModule, ProductCard, CurrencyPipe, RouterLink], // importer ProductCard pour l'input
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductList implements OnInit {
  products: Product[] = [];
  cartItems: Product[] = [];
  favoriteIds: number[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  // 👇 Méthode appelée par un output envoyé depuis l'enfant
  onProductAddedToCart(product: Product): void {
    this.cartItems.push(product);
    console.log(`${product.name} ajouté au panier !`);
    console.log(`Panier: ${this.cartItems.length} articles`);
  }

  // 👇 Méthode appelée par un output envoyé depuis l'enfant
  onProductAddedToFavorites(product: Product): void {
    this.favoriteIds.push(product.id);
    console.log(`${product.name} ajouté aux favoris !`);
  }

  // 👇 Méthode appelée par un output envoyé depuis l'enfant
  onProductRemovedFromFavorites(product: Product): void {
    this.favoriteIds = this.favoriteIds.filter(id => id !== product.id);
    console.log(`${product.name} retiré des favoris !`);
  }

  // Méthodes utilitaires
  isInFavorites(productId: number): boolean {
    return this.favoriteIds.includes(productId);
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  getFavoritesCount(): number {
    return this.favoriteIds.length;
  }


  private loadProducts(): void {
    //this.products: Product[] = [
    this.products = [
      {
        id: 1,
        name: 'The Witcher 3: Wild Hunt',
        description: 'Jeu de rôle en monde ouvert dans un univers fantasy sombre',
        price: 39.99,
        imageUrl: 'https://placehold.co/300x200/8B0000/ffffff?text=Witcher',
        category: 'gaming',
        inStock: true,
        rating: 4.9
      },
      {
        id: 2,
        name: 'Nike Air Max 270',
        description: 'Baskets de running avec technologie Air Max visible',
        price: 149.99,
        imageUrl: 'https://placehold.co/300x200/FF6347/ffffff?text=Nike',
        category: 'clothing',
        inStock: true,
        rating: 4.5
      },
      {
        id: 3,
        name: 'Cuisinart Coffee Maker',
        description: 'Cafetière programmable 12 tasses avec carafe en verre',
        price: 89.99,
        imageUrl: 'https://placehold.co/300x200/4682B4/ffffff?text=Coffee',
        category: 'home',
        inStock: false,
        rating: 4.2
      },
      {
        id: 4,
        name: 'Canon EOS R50',
        description: 'Appareil photo hybride 24MP avec objectif kit 18-45mm',
        price: 679.99,
        imageUrl: 'https://placehold.co/300x200/2F4F4F/ffffff?text=Canon',
        category: 'electronics',
        inStock: true,
        rating: 4.7
      },
      {
        id: 5,
        name: 'Yoga Mat Premium',
        description: 'Tapis de yoga antidérapant 6mm épaisseur, écologique',
        price: 45.50,
        imageUrl: 'https://placehold.co/300x200/9370DB/ffffff?text=Yoga',
        category: 'sports',
        inStock: false,
        rating: 4.3
      }
    ];
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  getInStockCount(): number {
    return this.products.filter(p => p.inStock).length;
  }
}
