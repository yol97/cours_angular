import { TestBed } from '@angular/core/testing';

import { UserRules } from './user.rules';

describe('UserRules', () => {
  let service: UserRules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
