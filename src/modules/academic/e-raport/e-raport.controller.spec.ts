import { Test, TestingModule } from '@nestjs/testing';
import { ERaportController } from './e-raport.controller';
import { ERaportService } from './e-raport.service';

describe('ERaportController', () => {
  let controller: ERaportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ERaportController],
      providers: [ERaportService],
    }).compile();

    controller = module.get<ERaportController>(ERaportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
