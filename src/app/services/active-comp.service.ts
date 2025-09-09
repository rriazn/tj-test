import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { Competition } from '../model/competition.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group.type';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ActiveCompService {
  constructor() {
    this.getActiveComp().subscribe({
      next: (data) => {
        this.activeComp.set(data);
      },
      error: (error) => {
        if (error.status === 401) {
          this.activeComp.set(null);
        } else {
          throw(error);
        }
      }
    });

    

    this.getActivePartID().subscribe({
      next: (data) => {
        
        this.activeParticipantID.set(data);
        
      },
      error: (error) => {
        
        if (error.status === 401) {
          this.activeParticipantID.set(-1);
        } else {
          throw(error);
        }
      }  
    });
    
  }
  http = inject(HttpClient);

  activeComp = signal<Competition | null>(null);

  activeGroupID = signal<number>(-1);
  activeGroup = computed<Group | null>(() => {
    const id = this.activeGroupID();
    const comp = this.activeComp?.();
    if (id != null && comp != null) {
      return comp.groups[id] ?? null;
    }
    return null;
  });

  // -1: no active Participant, only possible if activeGroup == null
  activeParticipantID = signal<number>(-1) ;

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
    return this.http.post("http://localhost:3000/activeComps/set-active-group", {id: this.activeGroupID()}, { responseType: 'text' });
  }

  getActiveGroupID(): Observable<number> {
    return this.http.get<number>("http://localhost:3000/activeComps/get-active-group"); 
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
