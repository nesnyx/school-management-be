import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rfid } from './entities/rfid.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AssignRfidDto } from './entities/assign-rfid.dto';
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
    // 1. Cek apakah kartu sudah terdaftar di sistem
    const existingCard = await this.rfidRepository.findOne({ where: { rfid } });
    if (existingCard) {
      throw new ConflictException('Kartu RFID ini sudah terdaftar');
    }

    // 2. Cek apakah User-nya memang ada
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    // 3. Simpan relasi ke table rfid_cards
    const newCard = this.rfidCardRepository.create({
      rfidUuid: rfid,
      userId,
      status: 'ACTIVE',
    });

    return await this.rfidCardRepository.save(newCard);
  }
  async create(createRfidDto: CreateRfidDto) {
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
