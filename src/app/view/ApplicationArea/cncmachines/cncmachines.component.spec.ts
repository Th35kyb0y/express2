import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNCMachinesComponent } from './cncmachines.component';

describe('CNCMachinesComponent', () => {
  let component: CNCMachinesComponent;
  let fixture: ComponentFixture<CNCMachinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CNCMachinesComponent]
    });
    fixture = TestBed.createComponent(CNCMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
