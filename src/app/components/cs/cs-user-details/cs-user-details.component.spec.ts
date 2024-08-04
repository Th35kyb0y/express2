import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSUserDetailsComponent } from './cs-user-details.component';

describe('CSUserDetailsComponent', () => {
  let component: CSUserDetailsComponent;
  let fixture: ComponentFixture<CSUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSUserDetailsComponent]
    });
    fixture = TestBed.createComponent(CSUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
