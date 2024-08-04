import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsReportsModelPopUpComponent } from './cs-reports-model-pop-up.component';

describe('CsReportsModelPopUpComponent', () => {
  let component: CsReportsModelPopUpComponent;
  let fixture: ComponentFixture<CsReportsModelPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsReportsModelPopUpComponent]
    });
    fixture = TestBed.createComponent(CsReportsModelPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
