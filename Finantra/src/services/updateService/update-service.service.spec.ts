import { TestBed } from '@angular/core/testing';

import { UpdateServiceService } from './update-service.service';

describe('UpdateServiceService', () => {
  let service: UpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
