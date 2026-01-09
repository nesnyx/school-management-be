import { Test, TestingModule } from '@nestjs/testing';
import { PunishmentController } from './punishment.controller';
import { PunishmentService } from './punishment.service';

describe('PunishmentController', () => {
  let controller: PunishmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PunishmentController],
      providers: [PunishmentService],
    }).compile();

    controller = module.get<PunishmentController>(PunishmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
