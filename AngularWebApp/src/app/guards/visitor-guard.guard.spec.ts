import { TestBed, async, inject } from '@angular/core/testing';

import { VisitorGuardGuard } from './visitor-guard.guard';

describe('VisitorGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitorGuardGuard]
    });
  });

  it('should ...', inject([VisitorGuardGuard], (guard: VisitorGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
