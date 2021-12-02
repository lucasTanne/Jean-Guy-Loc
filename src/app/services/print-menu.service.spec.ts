import { TestBed } from '@angular/core/testing';

import { PrintMenuService } from './print-menu.service';

describe('PrintMenuService', () => {
  let service: PrintMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
