import { TestBed } from '@angular/core/testing';

import { PathDirectoryService } from './path-directory.service';

describe('PathDirectoryService', () => {
  let service: PathDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
