import { Test, TestingModule } from '@nestjs/testing';
import { SolaceService } from './solace.service';

describe('SolaceService', () => {
  let service: SolaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolaceService],
    }).compile();

    service = module.get<SolaceService>(SolaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
