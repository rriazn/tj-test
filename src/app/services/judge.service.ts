import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Judge } from '../model/judge.type';
import { Observable } from 'rxjs';
import { HashService } from './hash.service';

@Injectable({
  providedIn: 'root'
})
export class JudgeService {
  http = inject(HttpClient);
  constructor() { }

  saveJudge(judge: Judge, pwHash: string, replace: boolean) {
    return this.http.post('http://localhost:3000/users', {
            user: {
              username: judge.name,
              pwHash: pwHash,
              function: judge.function
            },
            replace: replace
          }, {responseType: 'text'});
  }

  deleteJudge(judge: Judge) {
    return this.http.delete('http://localhost:3000/users/' + judge.name, {responseType: 'text'});
  }

  getJudges(): Observable<Judge[]> {
    return this.http.get<Judge[]>('http://localhost:3000/users');
  }
}
