import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartViewProductComponent } from './add-to-cart-view-product.component';

describe('AddToCartViewProductComponent', () => {
  let component: AddToCartViewProductComponent;
  let fixture: ComponentFixture<AddToCartViewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToCartViewProductComponent]
    });
    fixture = TestBed.createComponent(AddToCartViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
