import { TestBed } from '@angular/core/testing';

import { ClinicDataService } from './clinic-data.service';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicDataService = TestBed.get(ClinicDataService);
    expect(service).toBeTruthy();
  });
});
