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
    })
    
  }
  http = inject(HttpClient);

  activeComp: Competition | null = null;

  activeGroup: Group | null = null;

  saveActiveComp(comp: Competition) {
    return this.http.post("http://localhost:3000/set-active-comp", {id: comp.id}, { responseType: 'text' });
  }

  getActiveComp(): Observable<Competition> {
    return this.http.get<Competition>("http://localhost:3000/get-active-comp");
  }

  stopActiveComp() {
    return this.http.get("http://localhost:3000/stop-active-comp", { responseType: 'text' });
  }


  saveActiveGroup(group: Group) {
    return this.http.post("http://localhost:3000/set-active-group", {group: group}, { responseType: 'text' });
  }

  getActiveGroup(): Observable<Group> {
    return this.http.get<Group>("http://localhost:3000/get-active-group"); 
  }
}
