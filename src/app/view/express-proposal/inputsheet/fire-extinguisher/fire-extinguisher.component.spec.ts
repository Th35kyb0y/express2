import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireExtinguisherComponent } from './fire-extinguisher.component';

describe('FireExtinguisherComponent', () => {
  let component: FireExtinguisherComponent;
  let fixture: ComponentFixture<FireExtinguisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FireExtinguisherComponent]
    });
    fixture = TestBed.createComponent(FireExtinguisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
