import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductDetailsComponent } from './app-product-details.component';

describe('AppProductDetailsComponent', () => {
  let component: AppProductDetailsComponent;
  let fixture: ComponentFixture<AppProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppProductDetailsComponent]
    });
    fixture = TestBed.createComponent(AppProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
