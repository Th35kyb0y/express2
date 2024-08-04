import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignheaderComponent } from './designheader.component';

describe('DesignheaderComponent', () => {
  let component: DesignheaderComponent;
  let fixture: ComponentFixture<DesignheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignheaderComponent]
    });
    fixture = TestBed.createComponent(DesignheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
