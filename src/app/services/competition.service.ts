import { Injectable } from '@angular/core';
import { Competition } from '../model/competition.type';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor() { }
  name: string = "Test";
  date = DateTime.local();
  groups = [];
  part = [];

  getCompetitions(): Array<Competition> {
    return [{
      name: this.name,
      date: this.date,
      groups: this.groups,
      unassignedParticipants: this.part
    }];
  }
}
