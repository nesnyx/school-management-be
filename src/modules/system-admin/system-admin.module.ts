import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RfidModule } from './rfid/rfid.module';
import { SubmissionsModule } from './submissions/submissions.module';


@Module({
    imports: [UsersModule, RfidModule, SubmissionsModule],
})
export class SystemAdminModule { }
