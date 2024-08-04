import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSUserAddEditAddressComponent } from './cs-user-add-edit-address.component';

describe('CSUserAddEditAddressComponent', () => {
  let component: CSUserAddEditAddressComponent;
  let fixture: ComponentFixture<CSUserAddEditAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSUserAddEditAddressComponent]
    });
    fixture = TestBed.createComponent(CSUserAddEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
