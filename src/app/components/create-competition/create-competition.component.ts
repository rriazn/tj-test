import { Component, inject } from '@angular/core';
import { CompetitionService } from '../../services/competition.service';
import { CompetitionComponent } from '../competition/competition.component';

@Component({
  selector: 'app-create-competition',
  imports: [CompetitionComponent],
  templateUrl: './create-competition.component.html',
  styleUrl: './create-competition.component.scss'
})
export class CreateCompetitionComponent {
  competitionService = inject(CompetitionService);

  competitions = this.competitionService.getCompetitions();




}
