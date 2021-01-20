import { TestBed } from '@angular/core/testing';

import { MsgserviceService } from './msgservice.service';

describe('MsgserviceService', () => {
  let service: MsgserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
