import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryBankComponent } from './battery-bank.component';

describe('BatteryBankComponent', () => {
  let component: BatteryBankComponent;
  let fixture: ComponentFixture<BatteryBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatteryBankComponent]
    });
    fixture = TestBed.createComponent(BatteryBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
