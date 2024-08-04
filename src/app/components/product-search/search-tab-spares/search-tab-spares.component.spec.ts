import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabSparesComponent } from './search-tab-spares.component';

describe('SearchTabSparesComponent', () => {
  let component: SearchTabSparesComponent;
  let fixture: ComponentFixture<SearchTabSparesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTabSparesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTabSparesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
