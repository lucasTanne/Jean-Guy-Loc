import { TestBed } from '@angular/core/testing';

import { FetchGestionFilmService } from './fetch-gestion-film.service';

describe('FetchGestionFilmService', () => {
  let service: FetchGestionFilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchGestionFilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
