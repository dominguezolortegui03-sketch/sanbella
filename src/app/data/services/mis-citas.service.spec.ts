import { TestBed } from '@angular/core/testing';

import { MisCitasService } from './mis-citas.service';

describe('MisCitasService', () => {
  let service: MisCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
