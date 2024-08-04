import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderSummeryByProductComponent } from './cart-order-summery-by-product.component';

describe('CartOrderSummeryByProductComponent', () => {
  let component: CartOrderSummeryByProductComponent;
  let fixture: ComponentFixture<CartOrderSummeryByProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOrderSummeryByProductComponent]
    });
    fixture = TestBed.createComponent(CartOrderSummeryByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
