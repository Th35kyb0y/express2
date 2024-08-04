import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductDetilsSegmentComponent } from './app-product-detils-segment.component';

describe('AppProductDetilsSegmentComponent', () => {
  let component: AppProductDetilsSegmentComponent;
  let fixture: ComponentFixture<AppProductDetilsSegmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppProductDetilsSegmentComponent]
    });
    fixture = TestBed.createComponent(AppProductDetilsSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
