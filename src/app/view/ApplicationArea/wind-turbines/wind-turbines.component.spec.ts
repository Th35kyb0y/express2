import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindTurbinesComponent } from './wind-turbines.component';

describe('WindTurbinesComponent', () => {
  let component: WindTurbinesComponent;
  let fixture: ComponentFixture<WindTurbinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindTurbinesComponent]
    });
    fixture = TestBed.createComponent(WindTurbinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
