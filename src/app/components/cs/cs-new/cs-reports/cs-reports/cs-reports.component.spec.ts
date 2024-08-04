import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsReportsComponent } from './cs-reports.component';

describe('CsReportsComponent', () => {
  let component: CsReportsComponent;
  let fixture: ComponentFixture<CsReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsReportsComponent]
    });
    fixture = TestBed.createComponent(CsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
