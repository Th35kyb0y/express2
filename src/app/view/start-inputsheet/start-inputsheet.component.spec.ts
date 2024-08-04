import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInputsheetComponent } from './start-inputsheet.component';

describe('StartInputsheetComponent', () => {
  let component: StartInputsheetComponent;
  let fixture: ComponentFixture<StartInputsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartInputsheetComponent]
    });
    fixture = TestBed.createComponent(StartInputsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
