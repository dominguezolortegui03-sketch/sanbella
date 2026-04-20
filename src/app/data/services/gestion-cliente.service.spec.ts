import { TestBed } from '@angular/core/testing';

import { GestionClienteService } from './gestion-cliente.service';

describe('GestionClienteService', () => {
  let service: GestionClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
