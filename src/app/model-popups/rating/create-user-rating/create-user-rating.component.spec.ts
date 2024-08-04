import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserRatingComponent } from './create-user-rating.component';

describe('CreateUserRatingComponent', () => {
  let component: CreateUserRatingComponent;
  let fixture: ComponentFixture<CreateUserRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserRatingComponent]
    });
    fixture = TestBed.createComponent(CreateUserRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
