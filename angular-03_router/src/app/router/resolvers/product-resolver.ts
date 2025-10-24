import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { ProductApi } from '../../features/products/services/product-api';
import { Product } from '../../features/product/models/product.model';

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
  // 👇 Hop on peut injecter notre Service API directement dans le Resolver
  const productApi = inject(ProductApi);
  // 👇 En plus de ça, le résolver a accès "nativement" à la route actuelle
  const id = route.paramMap.get('id')!;
  // 👇 Le resolver retourne le résultat de getProductById(id)
  return productApi.getProductById(id);
};
