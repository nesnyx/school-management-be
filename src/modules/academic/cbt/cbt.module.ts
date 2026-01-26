import { Module } from '@nestjs/common';
import { CbtService } from './cbt.service';
import { CbtController } from './cbt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exams } from './entities/exam.entity';
import { Options } from './entities/option.entity';
import { Questions } from './entities/question.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Exams,Options, Questions])],
  controllers: [CbtController],
  providers: [CbtService],
  exports : [CbtService]
})
export class CbtModule {}
