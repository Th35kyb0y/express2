import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressComponent } from './billing-address.component';

describe('BillingAddressComponent', () => {
  let component: BillingAddressComponent;
  let fixture: ComponentFixture<BillingAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingAddressComponent]
    });
    fixture = TestBed.createComponent(BillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
