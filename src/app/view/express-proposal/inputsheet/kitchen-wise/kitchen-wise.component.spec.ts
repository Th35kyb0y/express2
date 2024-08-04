import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenWiseComponent } from './kitchen-wise.component';

describe('KitchenWiseComponent', () => {
  let component: KitchenWiseComponent;
  let fixture: ComponentFixture<KitchenWiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenWiseComponent]
    });
    fixture = TestBed.createComponent(KitchenWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
