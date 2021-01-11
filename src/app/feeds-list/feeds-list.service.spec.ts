import { TestBed } from '@angular/core/testing';

import { FeedsListService } from './feeds-list.service';

describe('FeedsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedsListService = TestBed.get(FeedsListService);
    expect(service).toBeTruthy();
  });
});
