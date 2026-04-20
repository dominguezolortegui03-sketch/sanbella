import { TestBed } from '@angular/core/testing';

import { SeguimientoAdminService } from './seguimiento-admin.service';

describe('SeguimientoAdminService', () => {
  let service: SeguimientoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguimientoAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
