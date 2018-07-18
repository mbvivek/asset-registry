/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UportService } from './uport.service';

describe('Service: Uport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UportService]
    });
  });

  it('should ...', inject([UportService], (service: UportService) => {
    expect(service).toBeTruthy();
  }));
});
