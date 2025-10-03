import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardcatsGuard } from './guardcats.guard';

describe('guardcatsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardcatsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
