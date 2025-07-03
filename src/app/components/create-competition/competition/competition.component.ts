import { Component, input, OnInit, signal } from '@angular/core';
import { Competition } from '../../../model/competition.type';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-competition',
  imports: [FormsModule],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent implements OnInit {
  ngOnInit(): void {
    this.dateString = this.competition().date.toISODate();
  }
  competition = input.required<Competition>();

  editMode = signal<boolean>(false);

  dateString: string | null = null;

  toggleEdit() {
    this.editMode.set(!this.editMode());
    if (this.dateString?.trim()) {
      this.competition().date = DateTime.fromISO(this.dateString);
    }
  }

  
}
