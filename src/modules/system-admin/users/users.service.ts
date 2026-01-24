import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto, manager? : EntityManager) {
    const repo = manager ? manager.getRepository(User) :this.userRepository
    const user = repo.create({
      identifier:createUserDto.identifier,
      password : createUserDto.password
    })
    return await repo.save(user)
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByIdentifier(identifier: string) {
    return await this.userRepository.findOneBy({ identifier });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const mergedUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(mergedUser);
  }

  async remove(id: string) {
    return await this.userRepository.delete({ id });
  }
}
