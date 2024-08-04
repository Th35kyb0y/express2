import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingRoomComponent } from './living-room.component';

describe('LivingRoomComponent', () => {
  let component: LivingRoomComponent;
  let fixture: ComponentFixture<LivingRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivingRoomComponent]
    });
    fixture = TestBed.createComponent(LivingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
