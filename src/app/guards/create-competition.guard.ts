import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const createCompetitionGuard: CanMatchFn = (route, segments) => {
  return inject(LoginService).verifyAdmin();
};
