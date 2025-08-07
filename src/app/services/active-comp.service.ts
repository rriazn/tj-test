import { inject, Injectable, OnInit } from '@angular/core';
import { Competition } from '../model/competition.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group.type';

@Injectable({
  providedIn: 'root'
})
export class ActiveCompService {
  constructor() {
    this.getActiveComp().subscribe({
      next: (data) => {
        this.activeComp = data;
      },
      error: (error) => {
        if (error.status === 401) {
          this.activeComp = null;
        } else {
          throw(error);
        }
      }
    });

    this.getActiveGroup().subscribe({
      next: (data) => {
        
        this.activeGroup = data;
      },
      error: (error) => {
        if (error.status === 401) {
          this.activeGroup = null;
        } else {
          throw(error);
        }
      }  
    });

    this.getActivePartID().subscribe({
      next: (data) => {
        
        this.activeParticipantID = data;
        
      },
      error: (error) => {
        
        if (error.status === 401) {
          this.activeParticipantID = -1;
        } else {
          throw(error);
        }
      }  
    });
    
  }
  http = inject(HttpClient);

  activeComp: Competition | null = null;

  activeGroup: Group | null = null;

  // -1: no active Participant, only possible if activeGroup == null
  activeParticipantID: number = -1;

  saveActiveComp(comp: Competition) {
    return this.http.post("http://localhost:3000/activeComps/set-active-comp", {id: comp.id}, { responseType: 'text' });
  }

  getActiveComp(): Observable<Competition> {
    return this.http.get<Competition>("http://localhost:3000/activeComps/get-active-comp");
  }

  stopActiveComp() {
    return this.http.get("http://localhost:3000/activeComps/stop-active-comp", { responseType: 'text' });
  }


  saveActiveGroup(group: Group) {
    const groupID = this.activeComp?.groups.findIndex((gr) => gr == group);
    return this.http.post("http://localhost:3000/activeComps/set-active-group", {id: groupID}, { responseType: 'text' });
  }

  getActiveGroup(): Observable<Group> {
    return this.http.get<Group>("http://localhost:3000/activeComps/get-active-group"); 
  }

  getActivePartID(): Observable<number> {
    return this.http.get<number>("http://localhost:3000/activeComps/get-active-part-id");
  }

  nextParticipant() {
    return this.http.get("http://localhost:3000/activeComps/next-part", { responseType: 'text' });
  }

  stopActiveGroup() {
    return this.http.get("http://localhost:3000/activeComps/stop-active-group", { responseType: 'text' });
  }
}
