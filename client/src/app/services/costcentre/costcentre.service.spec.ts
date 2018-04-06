import { TestBed, inject } from '@angular/core/testing';

import { CostCentreService } from './costcentre.service';

describe('CostCentreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CostCentreService]
    });
  });

  it('should be created', inject([CostCentreService], (service: CostCentreService) => {
    expect(service).toBeTruthy();
  }));
});
