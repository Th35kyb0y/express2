import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CncMachineComponent } from './cnc-machine.component';

describe('CncMachineComponent', () => {
  let component: CncMachineComponent;
  let fixture: ComponentFixture<CncMachineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CncMachineComponent]
    });
    fixture = TestBed.createComponent(CncMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
