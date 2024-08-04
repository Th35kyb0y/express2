import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePolicyComponent } from './store-policy.component';

describe('StorePolicyComponent', () => {
  let component: StorePolicyComponent;
  let fixture: ComponentFixture<StorePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorePolicyComponent]
    });
    fixture = TestBed.createComponent(StorePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
