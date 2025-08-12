import { Component, inject, signal } from '@angular/core';
import { Judge } from '../../model/judge.type';
import { JudgeFunction } from '../../enums/judge-functions';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HashService } from '../../services/hash.service';
import { catchError } from 'rxjs';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-manage-judges',
  imports: [FormsModule],
  templateUrl: './manage-judges.component.html',
  styleUrl: './manage-judges.component.scss'
})
export class ManageJudgesComponent {
  JudgeFunc = JudgeFunction;
  JudgeFuncVals = Object.values(JudgeFunction);

  http = inject(HttpClient);
  hashService = inject(HashService);
  errorService = inject(ErrorService);

  judges = signal<Judge[]>([]);
  newJudge = signal<Judge>(this.getStandartJudge());
  newPw = signal<string>('');
  editMode = signal<boolean>(false);
  


  getStandartJudge(): Judge {
    return {
      name: '',
      function: JudgeFunction.DIFFICULTY,
      id: 0
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
      if(this.judges().map((j) => j.id).includes(this.newJudge().id)) {
        this.judges.set(this.judges().filter(j => j.id != this.newJudge().id));
      } else {
        this.newJudge().id = this.findSmallestID();
      }
      this.http.post('http://localhost:3000/users/add-user', {
        user: {
          username: this.newJudge().name,
          pwHash: this.hashService.hashStringSHA256(this.newPw())
        }
      }, {responseType: 'text'}).pipe(
        catchError((err) => {
          this.errorService.showErrorMessage('error saving user ' + err);
          throw(err);
        })
      ).subscribe((data) => {
        this.judges().push(this.newJudge()); 
        this.editMode.set(false);
      })
    }
  }

  findSmallestID() {
    let lowestID = 0;
    let breakLoop = true;
    while(true) {
      for(const judge of this.judges()) {
        if(lowestID == judge.id && this.newJudge().function == judge.function) {
          lowestID += 1;
          breakLoop = false;
          break;
        }
      }
      if(breakLoop) {
        break;
      }
      breakLoop = true;
    }
    return lowestID;
  }
}
