import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationViewallComponent } from './notification-viewall.component';

describe('NotificationViewallComponent', () => {
  let component: NotificationViewallComponent;
  let fixture: ComponentFixture<NotificationViewallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationViewallComponent]
    });
    fixture = TestBed.createComponent(NotificationViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
