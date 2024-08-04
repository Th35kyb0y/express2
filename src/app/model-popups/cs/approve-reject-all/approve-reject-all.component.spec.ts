import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectAllComponent } from './approve-reject-all.component';

describe('ApproveRejectAllComponent', () => {
  let component: ApproveRejectAllComponent;
  let fixture: ComponentFixture<ApproveRejectAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveRejectAllComponent]
    });
    fixture = TestBed.createComponent(ApproveRejectAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
