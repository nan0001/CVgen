import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNotExistComponent } from './file-not-exist.component';

describe('FileNotExistComponent', () => {
  let component: FileNotExistComponent;
  let fixture: ComponentFixture<FileNotExistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileNotExistComponent]
    });
    fixture = TestBed.createComponent(FileNotExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
