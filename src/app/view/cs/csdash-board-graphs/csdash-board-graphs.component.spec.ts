import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSDashBoardGraphsComponent } from './csdash-board-graphs.component';

describe('CSDashBoardGraphsComponent', () => {
  let component: CSDashBoardGraphsComponent;
  let fixture: ComponentFixture<CSDashBoardGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSDashBoardGraphsComponent]
    });
    fixture = TestBed.createComponent(CSDashBoardGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
