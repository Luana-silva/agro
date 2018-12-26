import { TestBed, inject } from '@angular/core/testing';

import { EventAutoCompleteService } from './event-auto-complete.service';

describe('EventAutoCompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventAutoCompleteService]
    });
  });

  it('should be created', inject([EventAutoCompleteService], (service: EventAutoCompleteService) => {
    expect(service).toBeTruthy();
  }));
});
