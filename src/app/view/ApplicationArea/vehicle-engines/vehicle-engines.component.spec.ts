import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEnginesComponent } from './vehicle-engines.component';

describe('VehicleEnginesComponent', () => {
  let component: VehicleEnginesComponent;
  let fixture: ComponentFixture<VehicleEnginesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleEnginesComponent]
    });
    fixture = TestBed.createComponent(VehicleEnginesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
