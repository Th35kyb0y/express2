import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignUoModelComponent } from './login-sign-uo-model.component';

describe('LoginSignUoModelComponent', () => {
  let component: LoginSignUoModelComponent;
  let fixture: ComponentFixture<LoginSignUoModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignUoModelComponent]
    });
    fixture = TestBed.createComponent(LoginSignUoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
