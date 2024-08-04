import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasSuppressionSystemComponent } from './gas-suppression-system.component';

describe('GasSuppressionSystemComponent', () => {
  let component: GasSuppressionSystemComponent;
  let fixture: ComponentFixture<GasSuppressionSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GasSuppressionSystemComponent]
    });
    fixture = TestBed.createComponent(GasSuppressionSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
