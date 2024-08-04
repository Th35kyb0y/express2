import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsProspectsComponent } from './cs-prospects.component';

describe('CsProspectsComponent', () => {
  let component: CsProspectsComponent;
  let fixture: ComponentFixture<CsProspectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsProspectsComponent]
    });
    fixture = TestBed.createComponent(CsProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
