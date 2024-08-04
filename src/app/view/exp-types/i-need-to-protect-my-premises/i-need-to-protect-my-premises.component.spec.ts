import { ComponentFixture, TestBed } from '@angular/core/testing';

import { INeedToProtectMyPremisesComponent } from './i-need-to-protect-my-premises.component';

describe('INeedToProtectMyPremisesComponent', () => {
  let component: INeedToProtectMyPremisesComponent;
  let fixture: ComponentFixture<INeedToProtectMyPremisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [INeedToProtectMyPremisesComponent]
    });
    fixture = TestBed.createComponent(INeedToProtectMyPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
