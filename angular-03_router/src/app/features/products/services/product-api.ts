import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/services/base.api';
import { Product } from '../../product/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductApi extends BaseApi {
  private readonly endpoint = '/products.json';

  async getProducts(): Promise<Product[]> {
    console.log("Chargement json par getProducts")
    return this.get<Product[]>(this.endpoint);
  }

  async getProductById(id: string): Promise<Product> {
    console.log("Envoyé par getProductsById")
    //return this.get<Product>(`${this.endpoint}/${id}`);
    const products = this.get<Product[]>(this.endpoint)
    const product = products.then(products => products.find(product => product.id === Number(id)))
    return product.then(product => product as Product)
  }

  async createProduct(product: Product): Promise<Product> {
    return this.post<Product>(this.endpoint, product);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return this.put<Product>(`${this.endpoint}/${id}`, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
