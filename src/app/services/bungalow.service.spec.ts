import { TestBed } from '@angular/core/testing';

import { BungalowService } from './bungalow.service';

describe('BungalowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BungalowService = TestBed.get(BungalowService);
    expect(service).toBeTruthy();
  });
});
