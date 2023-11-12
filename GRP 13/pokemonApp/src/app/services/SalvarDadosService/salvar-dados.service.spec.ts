import { TestBed } from '@angular/core/testing';

import { SalvarDadosService } from './salvar-dados.service';

describe('SalvarDadosService', () => {
  let service: SalvarDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
