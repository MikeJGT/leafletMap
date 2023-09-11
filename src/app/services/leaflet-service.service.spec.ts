import { TestBed } from '@angular/core/testing';

import { LeafletServiceService } from './leaflet-service.service';

describe('LeafletServiceService', () => {
  let service: LeafletServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
