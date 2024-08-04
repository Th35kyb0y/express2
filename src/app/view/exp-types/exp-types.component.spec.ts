import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpTypesComponent } from './exp-types.component';

describe('ExpTypesComponent', () => {
  let component: ExpTypesComponent;
  let fixture: ComponentFixture<ExpTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpTypesComponent]
    });
    fixture = TestBed.createComponent(ExpTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
