import { TestBed } from '@angular/core/testing';

import { GestionPersonalService } from './gestion-personal.service';

describe('GestionPersonalService', () => {
  let service: GestionPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
