import { TestBed } from '@angular/core/testing';

import { ActivitesService } from './activites.service';

describe('ActivitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitesService = TestBed.get(ActivitesService);
    expect(service).toBeTruthy();
  });
});
