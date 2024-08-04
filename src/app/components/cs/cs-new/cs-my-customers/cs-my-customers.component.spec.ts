import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsMyCustomersComponent } from './cs-my-customers.component';

describe('CsMyCustomersComponent', () => {
  let component: CsMyCustomersComponent;
  let fixture: ComponentFixture<CsMyCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsMyCustomersComponent]
    });
    fixture = TestBed.createComponent(CsMyCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
