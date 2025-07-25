import { inject, Injectable } from '@angular/core';
import { Competition } from '../model/competition.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveActiveCompService {
  http = inject(HttpClient);

  activeComp: Competition | null = null;

  saveActiveComp(comp: Competition) {
    return this.http.post("http://localhost:3000/set-active-comp", {id: comp.id}, { responseType: 'text' });
  }

  getActiveComp(): Observable<Competition> {
    return this.http.get<Competition>("http://localhost:3000/get-active-comp");
  }
}
