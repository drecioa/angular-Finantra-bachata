import { TestBed } from '@angular/core/testing';

import { GeneralStatisticsService } from './general-statistics.service';

describe('GeneralStatisticsService', () => {
  let service: GeneralStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
