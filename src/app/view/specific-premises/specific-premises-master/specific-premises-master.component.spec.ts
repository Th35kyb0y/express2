import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPremisesMasterComponent } from './specific-premises-master.component';

describe('SpecificPremisesMasterComponent', () => {
  let component: SpecificPremisesMasterComponent;
  let fixture: ComponentFixture<SpecificPremisesMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificPremisesMasterComponent]
    });
    fixture = TestBed.createComponent(SpecificPremisesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
