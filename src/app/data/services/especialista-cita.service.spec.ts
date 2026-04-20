import { TestBed } from '@angular/core/testing';

import { EspecialistaCitaService } from './especialista-cita.service';

describe('EspecialistaCitaService', () => {
  let service: EspecialistaCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialistaCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
