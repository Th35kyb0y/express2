import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoodDetailsModalComponent } from './hood-details-modal.component';

describe('HoodDetailsModalComponent', () => {
  let component: HoodDetailsModalComponent;
  let fixture: ComponentFixture<HoodDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoodDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoodDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
