import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSUserRegistrationComponent } from './cs-user-registration.component';

describe('CSUserRegistrationComponent', () => {
  let component: CSUserRegistrationComponent;
  let fixture: ComponentFixture<CSUserRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSUserRegistrationComponent]
    });
    fixture = TestBed.createComponent(CSUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
