import { ComponentFixture, TestBed } from '@angular/core/testing';

import { INeedToProtectMyPremisesAareaComponent } from './i-need-to-protect-my-premises-aarea.component';

describe('INeedToProtectMyPremisesAareaComponent', () => {
  let component: INeedToProtectMyPremisesAareaComponent;
  let fixture: ComponentFixture<INeedToProtectMyPremisesAareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [INeedToProtectMyPremisesAareaComponent]
    });
    fixture = TestBed.createComponent(INeedToProtectMyPremisesAareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
