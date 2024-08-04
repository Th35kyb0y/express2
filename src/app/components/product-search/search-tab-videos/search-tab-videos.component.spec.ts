import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabVideosComponent } from './search-tab-videos.component';

describe('SearchTabVideosComponent', () => {
  let component: SearchTabVideosComponent;
  let fixture: ComponentFixture<SearchTabVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTabVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTabVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
