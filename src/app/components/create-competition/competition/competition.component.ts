import { Component, Input, input, OnInit, signal } from '@angular/core';
import { Competition } from '../../../model/competition.type';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-competition',
  imports: [FormsModule],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {
  competition = input.required<Competition>();
  formattedDate: string = '';

  ngOnInit() {
    if (this.competition) {
      this.formattedDate = DateTime.fromISO(this.competition().date).toFormat('dd.MM.yyyy');
    }
  }
}
