import { TestBed } from '@angular/core/testing';

import { VerPerfilService } from './ver-perfil.service';

describe('VerPerfilService', () => {
  let service: VerPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
