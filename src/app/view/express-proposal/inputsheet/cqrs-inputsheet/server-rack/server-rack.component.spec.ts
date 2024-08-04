import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerRackComponent } from './server-rack.component';

describe('ServerRackComponent', () => {
  let component: ServerRackComponent;
  let fixture: ComponentFixture<ServerRackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerRackComponent]
    });
    fixture = TestBed.createComponent(ServerRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
