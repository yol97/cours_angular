// src/app/router/resolvers/product.resolver.ts
import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Product} from '../../features/product/models/product.model';
import {ProductFacade} from '../../features/product/services/product.facade';

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
  // 👇 Hop on peut injecter notre Service API directement dans le Resolver
  const productFacade = inject(ProductFacade);
  // 👇 En plus de ça, le résolver a accès "nativement" à la route actuelle
  const id: number = Number(route.paramMap.get('id')!);
  // 👇 Le resolver retourne le résultat de getProductById(id)
  return productFacade.getProduct(id);
};
