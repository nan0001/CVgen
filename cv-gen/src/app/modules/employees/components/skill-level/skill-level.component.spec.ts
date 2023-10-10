import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillLevelComponent } from './skill-level.component';

describe('SkillLevelComponent', () => {
  let component: SkillLevelComponent;
  let fixture: ComponentFixture<SkillLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillLevelComponent]
    });
    fixture = TestBed.createComponent(SkillLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
