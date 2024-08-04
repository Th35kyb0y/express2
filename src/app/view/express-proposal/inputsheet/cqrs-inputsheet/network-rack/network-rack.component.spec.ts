import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkRackComponent } from './network-rack.component';

describe('NetworkRackComponent', () => {
  let component: NetworkRackComponent;
  let fixture: ComponentFixture<NetworkRackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkRackComponent]
    });
    fixture = TestBed.createComponent(NetworkRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
