import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerError } from './banner-error';

describe('BannerError', () => {
  let component: BannerError;
  let fixture: ComponentFixture<BannerError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
