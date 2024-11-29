import { TestBed } from '@angular/core/testing';

import { EspecificStatisticsService } from './especific-statistics.service';

describe('EspecificStatisticsService', () => {
  let service: EspecificStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecificStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
