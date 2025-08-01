import { Component, inject } from '@angular/core';
import { ActiveCompService } from '../../services/active-comp.service';

@Component({
  selector: 'app-admin-active-group',
  imports: [],
  templateUrl: './admin-active-group.component.html',
  styleUrl: './admin-active-group.component.scss'
})
export class AdminActiveGroupComponent {
  activeCompService = inject(ActiveCompService);
}
