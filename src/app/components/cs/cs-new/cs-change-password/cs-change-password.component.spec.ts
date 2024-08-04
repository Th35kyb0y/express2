import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsChangePasswordComponent } from './cs-change-password.component';

describe('CsChangePasswordComponent', () => {
  let component: CsChangePasswordComponent;
  let fixture: ComponentFixture<CsChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsChangePasswordComponent]
    });
    fixture = TestBed.createComponent(CsChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
