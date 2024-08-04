import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportHomeComponent } from './customer-support-home.component';

describe('CustomerSupportHomeComponent', () => {
  let component: CustomerSupportHomeComponent;
  let fixture: ComponentFixture<CustomerSupportHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSupportHomeComponent]
    });
    fixture = TestBed.createComponent(CustomerSupportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
