import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ProductFacade} from '../../features/product/services/product.facade';

export const productListResolver: ResolveFn<boolean> = (route, state) => {
  const productFacade = inject(ProductFacade);
  productFacade.getProducts();
  return true;
};
