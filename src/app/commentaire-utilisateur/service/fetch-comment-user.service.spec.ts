import { TestBed } from '@angular/core/testing';

import { FetchCommentUserService } from './fetch-comment-user.service';

describe('FetchCommentUserService', () => {
  let service: FetchCommentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCommentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
