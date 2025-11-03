import { provideHttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {ProductApi} from '../../app/features/product/services/product.api';
import { ProductFacade } from "../../app/features/product/services/product.facade";
import { ProductStore } from "../../app/features/product/services/product.store";
import { Product } from "../../app/features/product/models/product.model";
// import {environment} from '../../environments/environment';

describe('ProductFacade.createProduct (integration)', () => {
  let facade: ProductFacade;
  let http: HttpTestingController;
  let store: ProductStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule, environment],
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        ProductFacade,
        ProductApi,
        ProductStore
      ],
    });

    facade = TestBed.inject(ProductFacade);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(ProductStore);
  });

  it('should call API, update store and return product', async () => {
    // 1. Arrange
    const dto = {
      name: 'Potion',
      description: 'Une super potion',
      price: 50,
      stock: 5,
      active: true,
      imageUrl: 'http://placehold.it/100x100',
      category: 'Gaming',
      inStock: true,
      rating: 0
    };

    // Backend renvoie un id de type number
    const mockResponse: Product = { ...dto, id: 123 };

    // 2. Act
    const promise = facade.createProduct(dto);

    // 3. Assert (API)
    const req = http.expectOne('/products.json'); // correspond à ton endpoint products
    // const req = http.expectOne(`${environment.apiUrl}/products`); // correspond à ton endpoint Api
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dto);

    // 4. Simuler la réponse du backend
    req.flush(mockResponse);

    // 5. Assert (Store + résultat)
    const result = await promise;
    expect(typeof result.id).toBe('number');
    expect(result.id).toBe(123);
    expect(store.products()[0]).toEqual(result);
  });
});
