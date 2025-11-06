import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { productResolver } from './resolvers/product-resolver';
import {productListResolver} from './resolvers/product-list-resolver';

export const routes: Routes = [
    { path: '', loadComponent: () => import("../features/home/pages/home.page") },

    // page test liste clients avec HttpClient
    { path: 'users', loadComponent: () => import('../features/user/components/user-list/user-list').then(m => m.UserList) },
    { path: 'photos', loadComponent: () => import("../features/product/components/photo-gallery/photo-gallery") },
    { path: 'products', loadComponent: () => import("../features/product/pages/product.page"), resolve: { products: productListResolver } },
    { path: 'cart', loadComponent: () => import("../features/cart/pages/cart.page")},
    { path: 'products/:id', loadComponent: () => import("../features/product/pages/product-detail.page"), resolve: {product: productResolver}},
    { path: 'admin', loadComponent: () => import("../features/admin/pages/admin.page"), canActivate: [authGuard] },
    { path: 'register', loadComponent: () => import("../features/auth/pages/register")},
    { path: 'login', loadComponent: () => import("../features/auth/pages/login") },
    { path: 'about', loadComponent: () => import("../features/about/pages/about.page") },
    { path: 'error', loadComponent: () => import("../core/pages/error.page") },
    { path: '**', redirectTo: 'error' }
];

/* Pour utiliser le loadComponent dans app.routes.ts, il faut d'abord ajouter "default" dans l'export du composant (user-list.ts) :
export default class UserList{}   */
