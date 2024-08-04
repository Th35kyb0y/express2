import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalPanelsComponent } from './electrical-panels.component';

describe('ElectricalPanelsComponent', () => {
  let component: ElectricalPanelsComponent;
  let fixture: ComponentFixture<ElectricalPanelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricalPanelsComponent]
    });
    fixture = TestBed.createComponent(ElectricalPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
