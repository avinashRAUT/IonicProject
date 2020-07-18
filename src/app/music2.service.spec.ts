import { TestBed } from '@angular/core/testing';

import { Music2Service } from './music2.service';

describe('Music2Service', () => {
  let service: Music2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Music2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
