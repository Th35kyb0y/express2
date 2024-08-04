import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuredDeliveryComponent } from './assured-delivery.component';

describe('AssuredDeliveryComponent', () => {
  let component: AssuredDeliveryComponent;
  let fixture: ComponentFixture<AssuredDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuredDeliveryComponent]
    });
    fixture = TestBed.createComponent(AssuredDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
