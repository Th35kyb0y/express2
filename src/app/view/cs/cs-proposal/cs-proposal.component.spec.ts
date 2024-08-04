import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsProposalComponent } from './cs-proposal.component';

describe('CsProposalComponent', () => {
  let component: CsProposalComponent;
  let fixture: ComponentFixture<CsProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsProposalComponent]
    });
    fixture = TestBed.createComponent(CsProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
