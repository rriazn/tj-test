import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Competition } from '../../model/competition.type';
import { ActiveCompService } from '../../services/active-comp.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Group } from '../../model/group.type';
import { CompetitionService } from '../../services/save-competition.service';
import { DateTime } from 'luxon';
import { Participant } from '../../model/participant.type';
import { E, G } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-execute-competition',
  imports: [],
  templateUrl: './execute-competition.component.html',
  styleUrl: './execute-competition.component.scss'
})
export class ExecuteCompetitionComponent implements OnInit{
  ngOnInit(): void {
    this.activeCompService.getActiveComp().pipe(
      catchError((err) => {
        throw(err);
      })
    ).subscribe((data) => this.activeCompService.activeComp.set(data));
  }
  activeCompService = inject(ActiveCompService);
  router = inject(Router);
  competitionService = inject(CompetitionService);
  errorService = inject(ErrorService);

  
  editedGroup: Group | null = null;


  
  editGroup(group: Group) {
    if(null == this.editedGroup) {
      this.editedGroup = window.structuredClone(group);
    } else {
      const confirm = window.confirm(`You have unsaved progress which will be lost if you continue.`);
      if(confirm) {
        this.editedGroup = window.structuredClone(group);
      }
    }
  }

  removePart(part: Participant) {
    const confirm = window.confirm(`Do you really want to remove ${part.lastName}, ${part.firstName}?`);
    if(this.editedGroup != null && confirm) {
      this.editedGroup.participants = this.editedGroup?.participants.filter((p) => p[0] != part);
    }
  }

  saveGroup(group: Group) {
    let activeComp = this.activeCompService.activeComp();
    if(activeComp != null) {
      activeComp.groups = activeComp.groups.map((el) => {
        if(el == group && this.editedGroup != null) {
          return this.editedGroup;
        } else {
          return el;
        }
      });
      this.activeCompService.activeComp.set(activeComp);
      this.competitionService.saveCompetition(activeComp).pipe(
          catchError((error) => {
              throw(error);
          })).subscribe((res) => this.editedGroup = null);
    }
  }

  getBirthYear(part: Participant) {
    return DateTime.fromISO(part.birthDate).year;
  }

  stopCompetition() {
    this.activeCompService.stopActiveComp().pipe(
      catchError((err) => {
        throw(err);
      })
    ).subscribe((res) => {
      this.activeCompService.activeComp.set(null);
      this.router.navigateByUrl('/');
    })
  }

  startGroup(group: Group) {

    console.log(this.activeCompService.activeGroupID())
    if(group.participants.length == 0) {
      this.errorService.showErrorMessage("Cannot start group with no participants");
      return;
    }

    if(this.activeCompService.activeGroup() != null) {
      if(group.title != this.activeCompService.activeGroup()?.title) {
        this.errorService.showErrorMessage("Cannot start group while other group is running");
      } else {
        this.router.navigateByUrl('/execute-group-admin');
      }
    } else {
      this.activeCompService.saveActiveGroup(group).pipe(
        catchError((err) => {
          throw(err);
        })
      ).subscribe((res) => {
        const comp = this.activeCompService.activeComp();
        if(comp != null) {
          this.activeCompService.activeGroupID.set(comp.groups.findIndex((gr) => gr == group));
        }
        this.activeCompService.activeParticipantID.set(0);
        this.router.navigateByUrl('/execute-group-admin');
      })
    }
  }
}
