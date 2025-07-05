import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { CompetitionComponent } from './competition/competition.component';
import { Competition } from '../../model/competition.type';
import { DateTime } from 'luxon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-create-competition',
  imports: [CompetitionComponent, FormsModule, UploadComponent],
  templateUrl: './create-competition.component.html',
  styleUrl: './create-competition.component.scss'
})
export class CreateCompetitionComponent {
  competitionService = inject(CompetitionService);

  competitions = this.competitionService.getCompetitions();

  createOrEdit = signal<Boolean>(false);

  newComp: Competition = {
      name: "",
      date: DateTime.local(),
      groups: [],
      unassignedParticipants: [],
      id: Math.max(... this.competitions.map((comp) => comp.id)) + 1
    };
  newDate = DateTime.local().toISODate();

  createNewComp() {
    if(!this.createOrEdit()) {
      this.createOrEdit.set(true);
    } else {
      const confirm = window.confirm(`You have unsaved progress which will be lost if you continue.`);
      if(confirm) {
        this.newComp = {
          name: "",
          date: DateTime.local(),
          groups: [],
          unassignedParticipants: [],
          id: Math.max(... this.competitions.map((comp) => comp.id)) + 1
        };
      }
    }
  }

  editComp(comp: Competition) {
    if(this.createOrEdit()) {
      const confirm = window.confirm(`You have unsaved progress which will be lost if you continue.`);
      if(!confirm) {
        return;
      }
    }
    this.createOrEdit.set(true);
    this.newComp = comp;
  
  }

  deleteComp(comp: Competition) {
    const confirm = window.confirm(`Are you sure you want to delete "${comp.name}"?\nThis action cannot be reversed.`);
    if(confirm) {
      this.competitions = this.competitions.filter((entry) => entry != comp);

      // TODO: delete from backend
    }
  }

  saveComp() {
    this.competitions = this.competitions.filter((entry) => entry.id != this.newComp.id);
    this.newComp.date = DateTime.fromISO(this.newDate);
    this.competitions = [...this.competitions, this.newComp];
    this.newComp = {
      name: "",
      date: DateTime.local(),
      groups: [],
      unassignedParticipants: [],
      id: Math.max(... this.competitions.map((comp) => comp.id)) + 1
    };
    
    // TODO: save on backend

    this.createOrEdit.set(false);
    this.newDate = DateTime.local().toISODate();
  }

}
