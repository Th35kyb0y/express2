import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedInputComponent } from './customized-input.component';

describe('CustomizedInputComponent', () => {
  let component: CustomizedInputComponent;
  let fixture: ComponentFixture<CustomizedInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizedInputComponent]
    });
    fixture = TestBed.createComponent(CustomizedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
