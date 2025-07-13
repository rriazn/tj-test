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

  getCompetitions(): Array<Competition> {
    return [{
      name: this.name,
      date: this.date,
      groups: this.groups,
      unassignedParticipants: this.part,
      id: 0
    },
    {
      name: "www",
      date: this.date,
      groups: [],
      unassignedParticipants: [],
      id: 1
    }];
  }

  saveCompetition(comp: Competition) {
    this.http.post("http://localhost:3000/save-competition", {competition: comp}, { responseType: 'text' }).subscribe();
  }
}
