import { TestBed } from '@angular/core/testing';

import { LevelContestService } from './level-contest.service';

describe('LevelContestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelContestService = TestBed.get(LevelContestService);
    expect(service).toBeTruthy();
  });
});
