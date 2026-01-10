import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rfid } from './entities/rfid.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AssignRfidDto } from './dto/assign-rfid.dto';
import { RfidCard } from './entities/rfid-cards.entity';

@Injectable()
export class RfidService {
  constructor(
    @InjectRepository(Rfid)
    private readonly rfidRepository: Repository<Rfid>,
    @InjectRepository(RfidCard)
    private readonly rfidCardRepository: Repository<RfidCard>,
    private readonly usersService: UsersService
  ) { }

  async assignCardToUser(assignRfidDto: AssignRfidDto) {
    const { rfid, userId } = assignRfidDto;
    const existingRfid = await this.rfidRepository.findOne({ where: { rfid } });
    if (!existingRfid) {
      throw new NotFoundException('Kartu RFID tidak ditemukan');
    }
    const existingCard = await this.rfidCardRepository.findOne({ where: { rfidUuid: rfid } });
    if (existingCard) {
      throw new ConflictException('Kartu RFID ini sudah terdaftar');
    }
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const newCard = this.rfidCardRepository.create({
      rfidUuid: rfid,
      userId: user.id,
      status: 'ACTIVE',
    });

    return await this.rfidCardRepository.save(newCard);
  }

  async create(createRfidDto: CreateRfidDto) {
    const existingRfid = await this.rfidRepository.findOne({ where: { rfid: createRfidDto.rfid } });
    if (existingRfid) {
      throw new ConflictException('Kartu RFID ini sudah terdaftar');
    }
    const rfid = this.rfidRepository.create(createRfidDto);
    return await this.rfidRepository.save(rfid);
  }

  async findAll() {
    return await this.rfidRepository.find();
  }

  async findRfidCardByrfId(id: string) {
    const card = await this.rfidCardRepository.findOne({
      where: { rfidUuid: id, status: 'ACTIVE' },
      relations: ['user'],
    });

    if (!card) {
      throw new NotFoundException('Kartu tidak dikenal atau tidak aktif');
    }

    return card;
  }
  async findRfidById(id: number) {
    return await this.rfidRepository.findOne({ where: { id } });
  }

  async updateRfid(id: number, rfid: string) {
    const existingRfid = await this.rfidRepository.findOne({ where: { id } });
    if (!existingRfid) {
      throw new Error('Rfid not found');
    }
    existingRfid.rfid = rfid;
    return await this.rfidRepository.save(existingRfid);
  }

  async removeRfid(id: number) {
    return await this.rfidRepository.delete(id);
  }
}
