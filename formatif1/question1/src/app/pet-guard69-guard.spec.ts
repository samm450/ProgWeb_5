import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { petGuard69Guard } from './pet-guard69-guard';

describe('petGuard69Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => petGuard69Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
