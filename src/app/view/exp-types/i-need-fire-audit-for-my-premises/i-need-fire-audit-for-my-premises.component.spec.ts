import { ComponentFixture, TestBed } from '@angular/core/testing';

import { INeedFireAuditForMyPremisesComponent } from './i-need-fire-audit-for-my-premises.component';

describe('INeedFireAuditForMyPremisesComponent', () => {
  let component: INeedFireAuditForMyPremisesComponent;
  let fixture: ComponentFixture<INeedFireAuditForMyPremisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [INeedFireAuditForMyPremisesComponent]
    });
    fixture = TestBed.createComponent(INeedFireAuditForMyPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
