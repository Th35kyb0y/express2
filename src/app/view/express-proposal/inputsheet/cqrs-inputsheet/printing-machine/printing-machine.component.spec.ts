import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingMachineComponent } from './printing-machine.component';

describe('PrintingMachineComponent', () => {
  let component: PrintingMachineComponent;
  let fixture: ComponentFixture<PrintingMachineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintingMachineComponent]
    });
    fixture = TestBed.createComponent(PrintingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
