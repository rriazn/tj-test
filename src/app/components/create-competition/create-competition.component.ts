import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { CompetitionComponent } from './competition/competition.component';
import { Competition } from '../../model/competition.type';
import { DateTime } from 'luxon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { Group } from '../../model/group.type';
import { Participant } from '../../model/participant.type';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-competition',
  imports: [CompetitionComponent, FormsModule, UploadComponent, DragDropModule],
  templateUrl: './create-competition.component.html',
  styleUrl: './create-competition.component.scss'
})
export class CreateCompetitionComponent {
  competitionService = inject(CompetitionService);

  competitions = this.competitionService.getCompetitions();

  createOrEdit = signal<Boolean>(false);
  
  newCompName: string = "";
  newDate: string | null = DateTime.local().toISODate();
  newGroups: Array<Group> = [];
  newUnassignedParticipants: Array<Participant> = [];
  currId: number = Math.max(... this.competitions.map((comp) => comp.id)) + 1;

  groupName: string = "";

  createNewComp() {
    if(!this.createOrEdit()) {
      this.createOrEdit.set(true);
    } else {
      const confirm = window.confirm(`You have unsaved progress which will be lost if you continue.`);
      if(confirm) {
        this.newCompName = "";
        this.newDate = DateTime.local().toISODate();
        this.newGroups = [];
        this.newUnassignedParticipants = [];
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
    this.newCompName = comp.name;
    this.newDate = comp.date.toISODate();
    this.newGroups = window.structuredClone(comp.groups);
    this.newUnassignedParticipants = window.structuredClone(comp.unassignedParticipants);
    this.currId = comp.id;
  }

  deleteComp(comp: Competition) {
    const confirm = window.confirm(`Are you sure you want to delete "${comp.name}"?\nThis action cannot be reversed.`);
    if(confirm) {
      this.competitions = this.competitions.filter((entry) => entry != comp);

      // TODO: delete from backend
    }
  }

  saveComp() {
    this.competitions = this.competitions.filter((entry) => entry.id != this.currId);
    if(this.newDate?.slice()) {
      const newComp: Competition = {
        name: this.newCompName,
        date: DateTime.fromISO(this.newDate),
        groups: this.newGroups,
        unassignedParticipants: this.newUnassignedParticipants,
        id: this.currId
      }
      this.competitions = [...this.competitions, newComp];
      this.competitionService.saveCompetition(newComp);
      this.newCompName = "";
      this.newDate = DateTime.local().toISODate();
      this.newGroups = [];
      this.newUnassignedParticipants = [];
    }
    
    

    this.createOrEdit.set(false);
    this.newDate = DateTime.local().toISODate();
  }

  getParticipants(parts: Participant[]) {
    this.newUnassignedParticipants = this.newUnassignedParticipants.concat(parts);

  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addGroup();
    }
  }

  addGroup() {
    if(this.groupName != "") {
      this.newGroups = [...this.newGroups, {
        title: this.groupName,
        participants: []
      }];
      this.groupName = "";
    } 
    
  }

  deleteGroup(group: Group) {
    const confirm = window.confirm(`Are you sure you want to delete "${group.title}"?\nThis action cannot be reversed.`);
    if(confirm) {
      this.newUnassignedParticipants = this.newUnassignedParticipants.concat(group.participants);
      this.newGroups = this.newGroups.filter((entry) => entry != group);
    }
  }

  deleteParticipant(part: Participant) {
    this.newUnassignedParticipants = this.newUnassignedParticipants.filter((e) => e != part);
  }

  deleteParticipantFromGroup(part: Participant, group: Group) {
    this.newGroups.map((g) => {
      if(g == group) {
        g.participants = g.participants.filter((p) => p != part);
      }
    })
  }


  drop(event: CdkDragDrop<Participant[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
