import { TestBed } from '@angular/core/testing';

import { FecthUserProfileService } from './fecth-user-profile.service';

describe('FecthUserProfileService', () => {
  let service: FecthUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FecthUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
