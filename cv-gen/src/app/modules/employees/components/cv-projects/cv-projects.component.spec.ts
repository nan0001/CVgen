import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectsComponent } from './cv-projects.component';

describe('CvProjectsComponent', () => {
  let component: CvProjectsComponent;
  let fixture: ComponentFixture<CvProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvProjectsComponent]
    });
    fixture = TestBed.createComponent(CvProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
