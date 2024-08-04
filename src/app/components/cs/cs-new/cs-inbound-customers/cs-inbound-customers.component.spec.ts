import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsInboundCustomersComponent } from './cs-inbound-customers.component';

describe('CsInboundCustomersComponent', () => {
  let component: CsInboundCustomersComponent;
  let fixture: ComponentFixture<CsInboundCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsInboundCustomersComponent]
    });
    fixture = TestBed.createComponent(CsInboundCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
