import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CqrsComponent } from './cqrs.component';

describe('CqrsComponent', () => {
  let component: CqrsComponent;
  let fixture: ComponentFixture<CqrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CqrsComponent]
    });
    fixture = TestBed.createComponent(CqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
