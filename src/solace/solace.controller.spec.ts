import { Test, TestingModule } from '@nestjs/testing';
import { SolaceController } from './solace.controller';
import { SolaceService } from './solace.service';

describe('SolaceController', () => {
  let controller: SolaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolaceController],
      providers: [SolaceService],
    }).compile();

    controller = module.get<SolaceController>(SolaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
