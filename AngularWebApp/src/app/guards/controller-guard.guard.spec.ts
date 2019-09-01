import { TestBed, async, inject } from '@angular/core/testing';

import { ControllerGuardGuard } from './controller-guard.guard';

describe('ControllerGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControllerGuardGuard]
    });
  });

  it('should ...', inject([ControllerGuardGuard], (guard: ControllerGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
