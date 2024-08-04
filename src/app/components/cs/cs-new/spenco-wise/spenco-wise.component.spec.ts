import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpencoWiseComponent } from './spenco-wise.component';

describe('SpencoWiseComponent', () => {
  let component: SpencoWiseComponent;
  let fixture: ComponentFixture<SpencoWiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpencoWiseComponent]
    });
    fixture = TestBed.createComponent(SpencoWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
