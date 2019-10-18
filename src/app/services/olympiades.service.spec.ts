import { TestBed } from '@angular/core/testing';

import { OlympiadesService } from './olympiades.service';

describe('OlympiadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OlympiadesService = TestBed.get(OlympiadesService);
    expect(service).toBeTruthy();
  });
});
