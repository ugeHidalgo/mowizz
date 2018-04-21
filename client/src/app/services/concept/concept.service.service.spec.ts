import { TestBed, inject } from '@angular/core/testing';

import { ConceptService } from './concept.service';

describe('Concept.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConceptService]
    });
  });

  it('should be created', inject([ConceptService], (service: ConceptService) => {
    expect(service).toBeTruthy();
  }));
});
