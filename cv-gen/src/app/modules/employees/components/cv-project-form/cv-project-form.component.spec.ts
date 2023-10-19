import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectFormComponent } from './cv-project-form.component';

describe('ProjectFormComponent', () => {
  let component: CvProjectFormComponent;
  let fixture: ComponentFixture<CvProjectFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvProjectFormComponent],
    });
    fixture = TestBed.createComponent(CvProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
