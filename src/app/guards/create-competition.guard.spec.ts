import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { createCompetitionGuard } from './create-competition.guard';

describe('createCompetitionGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createCompetitionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
