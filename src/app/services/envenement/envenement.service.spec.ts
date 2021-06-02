import { TestBed } from '@angular/core/testing';

import { EnvenementService } from './envenement.service';

describe('EnvenementService', () => {
  let service: EnvenementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvenementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
