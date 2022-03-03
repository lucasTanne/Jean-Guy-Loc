import { TestBed } from '@angular/core/testing';

import { FetchRenduService } from './fetch-rendu.service';

describe('FetchRenduService', () => {
  let service: FetchRenduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchRenduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
