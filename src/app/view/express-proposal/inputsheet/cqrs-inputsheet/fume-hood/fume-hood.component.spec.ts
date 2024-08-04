import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FumeHoodComponent } from './fume-hood.component';

describe('FumeHoodComponent', () => {
  let component: FumeHoodComponent;
  let fixture: ComponentFixture<FumeHoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FumeHoodComponent]
    });
    fixture = TestBed.createComponent(FumeHoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
