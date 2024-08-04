import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMobileHomeComponent } from './app-mobile-home.component';

describe('AppMobileHomeComponent', () => {
  let component: AppMobileHomeComponent;
  let fixture: ComponentFixture<AppMobileHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppMobileHomeComponent]
    });
    fixture = TestBed.createComponent(AppMobileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
