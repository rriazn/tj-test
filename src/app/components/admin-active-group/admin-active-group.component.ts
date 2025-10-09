import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActiveCompService } from '../../services/active-comp.service';
import { catchError } from 'rxjs';
import { ErrorService } from '../../services/error.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GroupStage } from '../../enums/group-stage';

@Component({
  selector: 'app-admin-active-group',
  imports: [FormsModule],
  templateUrl: './admin-active-group.component.html',
  styleUrl: './admin-active-group.component.scss'
})
export class AdminActiveGroupComponent {
  groupStage = GroupStage;
  activeCompService = inject(ActiveCompService);
  errorService = inject(ErrorService);
  router = inject(Router);

  group = this.activeCompService.activeGroup();
  activePart = this.activeCompService.activeGroup()?.participants[this.activeCompService.activeParticipantID()];

  penalty = signal<number>(0);

  nextParticipant() {
    this.activeCompService.nextParticipant().pipe(
      catchError((err) => {
        this.errorService.showErrorMessage("Error setting next participant");
        this.router.navigateByUrl('/');
        throw(err);
      })
    ).subscribe((data) => {
      if(this.group != undefined) {
        this.activeCompService.activeParticipantID.set((this.activeCompService.activeParticipantID() + 1) % this.group?.participants.length);
        if(this.activeCompService.activeParticipantID() == 0) {
          const group = this.activeCompService.activeGroup();
          if (group != null) {
            group.stage += 1;
          }
        }
        this.activePart = this.activeCompService.activeGroup()?.participants[this.activeCompService.activeParticipantID()];
      }
    })
  }

  endGroup() {
    this.activeCompService.stopActiveGroup().pipe(
      catchError((err) => {
        this.errorService.showErrorMessage("Error stopping competition");
        throw(err);
      })
    ).subscribe((data) => {
      this.router.navigateByUrl('/execute-competition');
      this.activeCompService.activeGroupID.set(-1);
      this.activeCompService.activeParticipantID.set(-1);
    })
  }
  
}
