import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsLeftNavComponent } from './cs-left-nav.component';

describe('CsLeftNavComponent', () => {
  let component: CsLeftNavComponent;
  let fixture: ComponentFixture<CsLeftNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsLeftNavComponent]
    });
    fixture = TestBed.createComponent(CsLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
