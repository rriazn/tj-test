import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { checkAdminGuard } from './check-admin.guard';

describe('createCompetitionGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
