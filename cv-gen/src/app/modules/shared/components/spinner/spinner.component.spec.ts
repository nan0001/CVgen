import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { ThemeService } from '../../../core/services/theme.service';
import { of } from 'rxjs';
import { PrimeDesignModule } from '../../../prime-design/prime-design.module';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrimeDesignModule],
      declarations: [SpinnerComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: jasmine.createSpyObj('ThemeService', [], {
            currentTheme$: of(''),
          }),
        },
      ],
    });
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
