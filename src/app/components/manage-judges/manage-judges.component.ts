import { Component, signal } from '@angular/core';
import { Judge } from '../../model/judge.type';
import { JudgeFunction } from '../../enums/judge-functions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-judges',
  imports: [FormsModule],
  templateUrl: './manage-judges.component.html',
  styleUrl: './manage-judges.component.scss'
})
export class ManageJudgesComponent {
  JudgeFunc = JudgeFunction;
  JudgeFuncVals = Object.values(JudgeFunction);

  judges = signal<Judge[]>([]);
  newJudge = signal<Judge>(this.getStandartJudge());
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
      // TODO: save on backend
      this.judges().push(this.newJudge()); 
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
