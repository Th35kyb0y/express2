import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProductFilterComponent } from './mobile-product-filter.component';

describe('MobileProductFilterComponent', () => {
  let component: MobileProductFilterComponent;
  let fixture: ComponentFixture<MobileProductFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileProductFilterComponent]
    });
    fixture = TestBed.createComponent(MobileProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
