import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFollowUpAddComponent } from './project-follow-up-add.component';

describe('ProjectFollowUpAddComponent', () => {
  let component: ProjectFollowUpAddComponent;
  let fixture: ComponentFixture<ProjectFollowUpAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectFollowUpAddComponent]
    });
    fixture = TestBed.createComponent(ProjectFollowUpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
