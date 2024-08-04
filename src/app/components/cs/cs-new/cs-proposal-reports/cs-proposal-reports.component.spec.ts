import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsProposalReportsComponent } from './cs-proposal-reports.component';

describe('CsProposalReportsComponent', () => {
  let component: CsProposalReportsComponent;
  let fixture: ComponentFixture<CsProposalReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsProposalReportsComponent]
    });
    fixture = TestBed.createComponent(CsProposalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
