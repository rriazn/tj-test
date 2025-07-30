import { inject, Injectable } from '@angular/core';
import { Competition } from '../model/competition.type';
import { DateTime } from 'luxon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor() { }
  http = inject(HttpClient);

  name: string = "Test";
  date = DateTime.local();
  groups = [];
  part = [];

  getCompetitions() {
    return this.http.get<Array<Competition>>("http://localhost:3000/get-competitions");
  }

  saveCompetition(comp: Competition) {
    return this.http.post("http://localhost:3000/save-competition", {competition: comp}, { responseType: 'text' });
  }

  deleteCompetition(comp: Competition) {
    return this.http.post("http://localhost:3000/delete-competition", {id: comp.id}, { responseType: 'text' });
  }
}
