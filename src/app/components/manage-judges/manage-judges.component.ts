import { Component, inject, OnInit, signal } from '@angular/core';
import { Judge } from '../../model/judge.type';
import { JudgeFunction } from '../../enums/judge-functions';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HashService } from '../../services/hash.service';
import { catchError } from 'rxjs';
import { ErrorService } from '../../services/error.service';
import { JudgeService } from '../../services/judge.service';

@Component({
  selector: 'app-manage-judges',
  imports: [FormsModule],
  templateUrl: './manage-judges.component.html',
  styleUrl: './manage-judges.component.scss'
})
export class ManageJudgesComponent implements OnInit{
  
  ngOnInit(): void {
    this.judgeService.getJudges().subscribe({
      next: (data) => {
        this.judges.set(data);
      },
      error: (error) => {
        this.errorService.showErrorMessage('Error getting judges');
        throw(error);
      }  
    });
  }
  
  JudgeFunc = JudgeFunction;
  JudgeFuncVals = Object.values(JudgeFunction);

  judgeService = inject(JudgeService);
  hashService = inject(HashService);
  errorService = inject(ErrorService);

  judges = signal<Judge[]>([]);
  newJudge = signal<Judge>(this.getStandartJudge());
  newPw = signal<string>('');
  editMode = signal<boolean>(false);
  


  getStandartJudge(): Judge {
    return {
      name: '',
      displayName: '',
      function: JudgeFunction.DIFFICULTY
    }
  }

  addJudge() {
    if(this.editMode()) {
      const confirm = window.confirm('You have unsaved progress. Do you want to continue?');
      if(!confirm) {
        return;
      }
    }
    this.newJudge.set(this.getStandartJudge());
    this.editMode.set(true);
  }

  editJudge(judge: Judge) {
    if(this.editMode()) {
      const confirm = window.confirm('You have unsaved progress. Do you want to continue?');
      if(!confirm) {
        return;
      }
    }
    this.newJudge.set(window.structuredClone(judge));
    this.editMode.set(true);
  }

  saveJudge() {
    if(this.editMode()) {
      // check if it is replacing an existing judge (boolean so check doesnt have to be done twice)
      let replace = false;
      if(this.judges().map((j) => j.name).includes(this.newJudge().name)) {
        const confirm = window.confirm(`Are you sure you want to overwrite ${this.newJudge.name}?`);
        if(!confirm) {
          return;
        }
        replace = true;
      }
      this.judgeService.saveJudge(this.newJudge(), this.newPw(), replace).pipe(
        catchError((err) => {
          this.errorService.showErrorMessage('error saving user ' + err);
          throw(err);
        })
      ).subscribe((data) => {
        if(replace) {
          this.judges.set(this.judges().filter((el) => el.name != this.newJudge().name));
        }
        this.judges().push(this.newJudge()); 
        this.editMode.set(false);
      })
    }
  }

  deleteJudge(judge: Judge) {
    const confirm = window.confirm("Are you sure you want to delete user " + judge.name + "? This action cannot be reversed.")
    if(confirm) {
      this.judgeService.deleteJudge(judge).pipe(catchError((err) => {
      this.errorService.showErrorMessage('error deleting user ' + err);
      throw(err);
    })).subscribe((data) => {
      this.judges.set(this.judges().filter((j) => j.name != judge.name));
    });
    }
  }

  async hashPw(pw: string) {
    this.newPw.set(await this.hashService.hashStringSHA256(pw));
  }
}
