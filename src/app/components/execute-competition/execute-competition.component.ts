import { Component, inject, input, OnInit } from '@angular/core';
import { Competition } from '../../model/competition.type';
import { SaveActiveCompService } from '../../services/save-active-comp.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-execute-competition',
  imports: [],
  templateUrl: './execute-competition.component.html',
  styleUrl: './execute-competition.component.scss'
})
export class ExecuteCompetitionComponent implements OnInit {
  activeCompService = inject(SaveActiveCompService);
  router = inject(Router);

  activeComp: Competition | null = null;

  ngOnInit(): void {
    this.activeCompService.getActiveComp().pipe(
      catchError((err) => {
        this.router.navigateByUrl('/');
        throw(err);
      })
    ).subscribe((res) => {
      this.activeComp = res;
      this.activeCompService.activeComp = res;
    });
    
  }
  
}
