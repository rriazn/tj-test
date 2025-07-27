import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Competition } from '../../model/competition.type';
import { SaveActiveCompService } from '../../services/save-active-comp.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Group } from '../../model/group.type';
import { CompetitionService } from '../../services/competition.service';
import { DateTime } from 'luxon';
import { Participant } from '../../model/participant.type';
import { E, G } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-execute-competition',
  imports: [],
  templateUrl: './execute-competition.component.html',
  styleUrl: './execute-competition.component.scss'
})
export class ExecuteCompetitionComponent implements OnInit {
  activeCompService = inject(SaveActiveCompService);
  router = inject(Router);
  competitionService = inject(CompetitionService);

  activeComp!: Competition;

  editedGroup: Group | null = null;

  ngOnInit(): void {
    this.activeCompService.getActiveComp().pipe(
      catchError((err) => {
        this.router.navigateByUrl('/');
        throw(err);
      })
    ).subscribe((res) => {
      this.activeComp = res;
      this.activeCompService.activeComp = res;
    });
  }
  
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
      this.editedGroup.participants = this.editedGroup?.participants.filter((p) => p != part);
    }
  }

  saveGroup(group: Group) {
    this.activeComp.groups = this.activeComp.groups.map((el) => {
      if(el == group && this.editedGroup != null) {
        return this.editedGroup;
      } else {
        return el;
      }
    });
    this.competitionService.saveCompetition(this.activeComp).pipe(
        catchError((error) => {
            throw(error);
        })).subscribe((res) => this.editedGroup = null);
  }

  getBirthYear(part: Participant) {
    return DateTime.fromISO(part.birthDate).year;
  }

  
  
  
  
}
