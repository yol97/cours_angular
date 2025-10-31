import {inject, Injectable} from '@angular/core';
import {ProductApi} from './product-api';
import {ProductStore} from './product.store';
import {NotificationService} from '../../../shared/services/notification.service';
import {ProductRules} from '../domain/product.rules';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {

  private productApi = inject(ProductApi);
  private productStore = inject(ProductStore);
  private notificationService = inject(NotificationService);

  getProducts() {
    this.productApi.getProducts().then(products => {
      this.productStore.setProducts(products);
    }).catch(error => {
      this.notificationService.showError(error.message);
    });
  }

  getProduct(id: number) {
    return this.productApi.getProductById(id)
  }

  async createProduct(dto: Omit<Product, 'id'>): Promise<Product> {
    ProductRules.validate(dto);

    const created = await this.productApi.createProduct(dto);
    this.productStore.add(created);

    return created;
  }

}
