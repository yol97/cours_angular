import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ProductApi} from '../../features/products/services/product-api';
import {Product} from '../../features/product/models/product.model';

export const productListResolver: ResolveFn<Product[]> = (route, state) => {
  const productApi = inject(ProductApi);
  //productApi.getProducts().then(products => {

  return productApi.getProducts()
};
