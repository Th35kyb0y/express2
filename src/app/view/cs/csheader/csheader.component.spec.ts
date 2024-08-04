import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSHeaderComponent } from './csheader.component';

describe('CSHeaderComponent', () => {
  let component: CSHeaderComponent;
  let fixture: ComponentFixture<CSHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSHeaderComponent]
    });
    fixture = TestBed.createComponent(CSHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
