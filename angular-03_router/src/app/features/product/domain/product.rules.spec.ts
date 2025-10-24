import { TestBed } from '@angular/core/testing';

import { ProductRules } from './product.rules';

describe('ProductRules', () => {
  let service: ProductRules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
