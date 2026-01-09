import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RfidModule } from './rfid/rfid.module';


@Module({
    imports: [UsersModule, RfidModule],
})
export class SystemAdminModule { }
