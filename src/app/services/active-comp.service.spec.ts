import { TestBed } from '@angular/core/testing';

import { ActiveCompService } from './active-comp.service';

describe('SaveActiveCompService', () => {
  let service: ActiveCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
