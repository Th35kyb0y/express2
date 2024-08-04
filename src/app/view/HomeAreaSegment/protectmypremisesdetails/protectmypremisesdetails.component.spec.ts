import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectmypremisesdetailsComponent } from './protectmypremisesdetails.component';

describe('ProtectmypremisesdetailsComponent', () => {
  let component: ProtectmypremisesdetailsComponent;
  let fixture: ComponentFixture<ProtectmypremisesdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectmypremisesdetailsComponent]
    });
    fixture = TestBed.createComponent(ProtectmypremisesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
