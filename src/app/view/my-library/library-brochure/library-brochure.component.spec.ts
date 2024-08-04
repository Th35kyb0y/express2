import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBrochureComponent } from './library-brochure.component';

describe('LibraryBrochureComponent', () => {
  let component: LibraryBrochureComponent;
  let fixture: ComponentFixture<LibraryBrochureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryBrochureComponent]
    });
    fixture = TestBed.createComponent(LibraryBrochureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
