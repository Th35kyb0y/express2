import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSUserFollowpHistoryComponent } from './cs-user-followp-history.component';

describe('CSUserFollowpHistoryComponent', () => {
  let component: CSUserFollowpHistoryComponent;
  let fixture: ComponentFixture<CSUserFollowpHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSUserFollowpHistoryComponent]
    });
    fixture = TestBed.createComponent(CSUserFollowpHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
