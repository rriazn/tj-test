import { TestBed } from '@angular/core/testing';

import { SaveActiveCompService } from './active-comp.service';

describe('SaveActiveCompService', () => {
  let service: SaveActiveCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveActiveCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
