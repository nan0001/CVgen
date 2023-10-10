import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-level',
  templateUrl: './skill-level.component.html',
  styleUrls: ['./skill-level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillLevelComponent {
  @Input() level = 0;
}
