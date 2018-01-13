import { TestBed, inject } from '@angular/core/testing';

import { EventResolver } from './event-resolver.service';

describe('EventResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventResolver]
    });
  });

  it('should be created', inject([EventResolver], (service: EventResolver) => {
    expect(service).toBeTruthy();
  }));
});
