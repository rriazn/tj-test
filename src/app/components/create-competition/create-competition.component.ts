import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
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
import { catchError } from 'rxjs';

@Component({
  selector: 'app-create-competition',
  imports: [CompetitionComponent, FormsModule, UploadComponent, DragDropModule],
  templateUrl: './create-competition.component.html',
  styleUrl: './create-competition.component.scss'
})
export class CreateCompetitionComponent implements OnInit{
[x: string]: any;
  ngOnInit(): void {
    this.competitionService.getCompetitions().pipe(
      catchError((err) => {
        throw err;
      })
    ).subscribe((comps) => {
      this.competitions = comps;
    });
    
  }
  competitionService = inject(CompetitionService);

  competitions: Array<Competition> = [];

  createOrEdit = signal<Boolean>(false);
  
  newCompName: string = "";
  newDate: string | null = DateTime.local().toISODate();
  newGroups: Array<Group> = [];
  newUnassignedParticipants: Array<Participant> = [];
  currId: number = 0;

  groupName: string = "";

  createNewComp() {
    if(!this.createOrEdit()) {
      this.createOrEdit.set(true);
      this.currId = Math.max(... this.competitions.map((comp) => comp.id)) + 1;
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
    this.newDate = comp.date;
    this.newGroups = window.structuredClone(comp.groups);
    this.newUnassignedParticipants = window.structuredClone(comp.unassignedParticipants);
    this.currId = comp.id;
  }

  deleteComp(comp: Competition) {
    const confirm = window.confirm(`Are you sure you want to delete "${comp.name}"?\nThis action cannot be reversed.`);
    if(confirm) {
      this.competitionService.deleteCompetition(comp).pipe(
        catchError((error) => {
          throw(error);
        }
        )).subscribe((resp) => {
          this.competitions = this.competitions.filter((entry) => entry != comp);
        });
    }
  }

  saveComp() {
    
    if(this.newDate?.slice()) {
      const newComp: Competition = {
        name: this.newCompName,
        date: this.newDate,
        groups: this.newGroups,
        unassignedParticipants: this.newUnassignedParticipants,
        id: this.currId
      }
      
      this.competitionService.saveCompetition(newComp).pipe(
        catchError((error) => {
            throw(error);
        })).subscribe((resp) => { 
          this.competitions = this.competitions.filter((entry) => entry.id != this.currId);       
          this.competitions = [...this.competitions, newComp];
          this.newCompName = "";
          this.newDate = DateTime.local().toISODate();
          this.newGroups = [];
          this.newUnassignedParticipants = [];
          this.createOrEdit.set(false);
      });
      
    }
    
    

    
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
