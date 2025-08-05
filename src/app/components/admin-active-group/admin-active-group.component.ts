import { Component, computed, inject, OnInit } from '@angular/core';
import { ActiveCompService } from '../../services/active-comp.service';
import { Participant } from '../../model/participant.type';

@Component({
  selector: 'app-admin-active-group',
  imports: [],
  templateUrl: './admin-active-group.component.html',
  styleUrl: './admin-active-group.component.scss'
})
export class AdminActiveGroupComponent {
  activeCompService = inject(ActiveCompService);

  activePart = this.activeCompService.activeGroup?.participants[this.activeCompService.activeParticipantID];
}
