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

  saveJudge(judge: Judge, pwHash: string) {
    return this.http.post('http://localhost:3000/users/add-user', {
            user: {
              username: judge.name,
              pwHash: pwHash,
              function: judge.function
            }
          }, {responseType: 'text'});
  }

  deleteJudge(judge: Judge) {
    return this.http.post('http://localhost:3000/users/add-user', {
        username: judge.name
      }, {responseType: 'text'});
  }

  getJudges(): Observable<Judge[]> {
    return this.http.get<Judge[]>('http://localhost:3000/users/get-users');
  }
}
