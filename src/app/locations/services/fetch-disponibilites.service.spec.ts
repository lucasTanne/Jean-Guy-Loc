import { TestBed } from '@angular/core/testing';

import { FetchDisponibilitesService } from './fetch-disponibilites.service';

describe('FetchDisponibilitesService', () => {
  let service: FetchDisponibilitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDisponibilitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
