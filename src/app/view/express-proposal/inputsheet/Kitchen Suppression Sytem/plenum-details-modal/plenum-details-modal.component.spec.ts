import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlenumDetailsModalComponent } from './plenum-details-modal.component';

describe('PlenumDetailsModalComponent', () => {
  let component: PlenumDetailsModalComponent;
  let fixture: ComponentFixture<PlenumDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlenumDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlenumDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
