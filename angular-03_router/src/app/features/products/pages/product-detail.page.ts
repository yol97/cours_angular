import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  imports: [],
  template: `
    <p>ID du produit en cours : {{ productId }}</p>
  `,
  styles: ``
})
export default class ProductDetailPage {
  private route = inject(ActivatedRoute);
  productId = this.route.snapshot.paramMap.get('id');

}
