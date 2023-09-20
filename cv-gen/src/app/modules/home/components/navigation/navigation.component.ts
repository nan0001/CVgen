import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  public links = [
    { name: 'employees', icon: 'pi-users' },
    { name: 'projects', icon: 'pi-list' },
    { name: 'cvs', icon: 'pi-id-card' },
    { name: 'entities', icon: 'pi-inbox' },
  ];
}
