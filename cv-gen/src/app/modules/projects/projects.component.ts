import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  constructor(private router: Router,
    private route: ActivatedRoute){}

  public addProject(): void {
    this.router.navigate(['new-project'], {
      relativeTo: this.route,
    });
  }
}
