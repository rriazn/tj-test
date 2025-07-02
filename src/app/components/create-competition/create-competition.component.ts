import { Component, inject, signal } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { CompetitionComponent } from '../competition/competition.component';
import { Competition } from '../../model/competition.type';
import { DateTime } from 'luxon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-competition',
  imports: [CompetitionComponent, FormsModule],
  templateUrl: './create-competition.component.html',
  styleUrl: './create-competition.component.scss'
})
export class CreateCompetitionComponent {
  competitionService = inject(CompetitionService);

  competitions = this.competitionService.getCompetitions();

  createNew = signal<Boolean>(false);

  newComp: Competition = {
      name: "",
      date: DateTime.local(),
      groups: [],
      unassignedParticipants: []
    };
  newDate = DateTime.local().toISODate();

  createNewComp() {
    if(!this.createNew()) {
      this.createNew.set(true);
    }
  }

  saveComp() {
    this.competitions = [...this.competitions, this.newComp];
    this.newComp = {
      name: "",
      date: DateTime.local(),
      groups: [],
      unassignedParticipants: []
    };
    this.createNew.set(false);
  }
}
