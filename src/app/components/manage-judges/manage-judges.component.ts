import { Component, signal } from '@angular/core';
import { Judge } from '../../model/judge.type';
import { JudgeFunction } from '../../enums/judge-functions';

@Component({
  selector: 'app-manage-judges',
  imports: [],
  templateUrl: './manage-judges.component.html',
  styleUrl: './manage-judges.component.scss'
})
export class ManageJudgesComponent {


  judges = signal<Judge[]>([]);
  newJudge = signal<Judge>(this.getStandartJudge());



  getStandartJudge(): Judge {
    return {
      name: '',
      function: JudgeFunction.DIFFICULTY,
      id: 0
    }
  }

  addJudge() {

  }
}
