import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommendedComponent } from './product-recommended.component';

describe('ProductRecommendedComponent', () => {
  let component: ProductRecommendedComponent;
  let fixture: ComponentFixture<ProductRecommendedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRecommendedComponent]
    });
    fixture = TestBed.createComponent(ProductRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
