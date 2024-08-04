import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeandcarComponent } from './homeandcar.component';

describe('HomeandcarComponent', () => {
  let component: HomeandcarComponent;
  let fixture: ComponentFixture<HomeandcarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeandcarComponent]
    });
    fixture = TestBed.createComponent(HomeandcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
