import { TestBed } from '@angular/core/testing';
import { CSVLoaderService } from './csv-loader.service';

describe('CSVLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CSVLoaderService = TestBed.get(CSVLoaderService);
    expect(service).toBeTruthy();
  });
});
