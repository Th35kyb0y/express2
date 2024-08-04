import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPurchaseHistoryComponent } from './my-purchase-history.component';

describe('MyPurchaseHistoryComponent', () => {
  let component: MyPurchaseHistoryComponent;
  let fixture: ComponentFixture<MyPurchaseHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPurchaseHistoryComponent]
    });
    fixture = TestBed.createComponent(MyPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
