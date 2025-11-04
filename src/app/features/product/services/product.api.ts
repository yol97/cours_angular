import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductApi extends BaseApi {
  private readonly endpoint = '/products.json';

  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>(this.endpoint);
  }

  async getProductById(id: number): Promise<Product> {
    //return this.get<Product>(`${this.endpoint}/${id}`);
    const products = this.get<Product[]>(this.endpoint)
    const product = products.then(products => products.find(product => product.id === id))
    return product.then(product => product as Product)
  }

  async createProduct(dto: Omit<Product, 'id'>): Promise<Product> {
    return this.post<Product>(this.endpoint, dto);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return this.put<Product>(`${this.endpoint}/${id}`, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
