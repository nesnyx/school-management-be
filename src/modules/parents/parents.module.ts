import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { UsersModule } from '../system-admin/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Parent])],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService]
})
export class ParentsModule { }
