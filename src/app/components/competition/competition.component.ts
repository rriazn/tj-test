import { Component, input } from '@angular/core';
import { Competition } from '../../model/competition.type';

@Component({
  selector: 'app-competition',
  imports: [],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {
  competition = input.required<Competition>();
}
