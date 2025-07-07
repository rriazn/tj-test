import { TestBed } from '@angular/core/testing';

import { ConvertExcelService } from './convert-excel.service';

describe('ConvertExcelService', () => {
  let service: ConvertExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
