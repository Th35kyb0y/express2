import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageCropComponent } from './profile-image-crop.component';

describe('ProfileImageCropComponent', () => {
  let component: ProfileImageCropComponent;
  let fixture: ComponentFixture<ProfileImageCropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileImageCropComponent]
    });
    fixture = TestBed.createComponent(ProfileImageCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
