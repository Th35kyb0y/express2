import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CqrsInputsheetComponent } from './cqrs-inputsheet.component';

describe('CqrsInputsheetComponent', () => {
  let component: CqrsInputsheetComponent;
  let fixture: ComponentFixture<CqrsInputsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CqrsInputsheetComponent]
    });
    fixture = TestBed.createComponent(CqrsInputsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
