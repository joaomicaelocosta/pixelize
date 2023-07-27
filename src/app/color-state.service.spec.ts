import { TestBed } from '@angular/core/testing';

import { ColorStateService } from './color-state.service';

describe('ColorStateService', () => {
  let service: ColorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
