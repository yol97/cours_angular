import {Product} from '../../product/models/product.model';

export type CartItemModel = {
  product: Product,
  quantity: number,
}
