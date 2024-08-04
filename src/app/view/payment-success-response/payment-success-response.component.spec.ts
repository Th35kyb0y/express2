import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessResponseComponent } from './payment-success-response.component';

describe('PaymentSuccessResponseComponent', () => {
  let component: PaymentSuccessResponseComponent;
  let fixture: ComponentFixture<PaymentSuccessResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSuccessResponseComponent]
    });
    fixture = TestBed.createComponent(PaymentSuccessResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
