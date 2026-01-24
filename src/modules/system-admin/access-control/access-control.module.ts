import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { UsersModule } from '../users/users.module';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, UserRole]), UsersModule],
  controllers: [AccessControlController],
  providers: [AccessControlService],
  exports : [AccessControlService]
})
export class AccessControlModule { }
