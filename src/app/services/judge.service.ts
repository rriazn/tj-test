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
  hashService = inject(HashService);
  constructor() { }

  saveJudge(judge: Judge) {
    this.http.post('http://localhost:3000/users/add-user', {
            user: {
              username: this.judge.name,
              pwHash: this.hashService.hashStringSHA256(this.newPw())
            }
          }, {responseType: 'text'})
  }

  deleteJudge(judge: Judge) {

  }

  getJudges(): Observable<Judge[]> {

  }
}
