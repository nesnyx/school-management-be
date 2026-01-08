import { Test, TestingModule } from '@nestjs/testing';
import { ECanteenController } from './e-canteen.controller';
import { ECanteenService } from './e-canteen.service';

describe('ECanteenController', () => {
  let controller: ECanteenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ECanteenController],
      providers: [ECanteenService],
    }).compile();

    controller = module.get<ECanteenController>(ECanteenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
