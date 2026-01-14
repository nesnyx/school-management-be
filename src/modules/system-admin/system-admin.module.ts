import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RfidModule } from './rfid/rfid.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AccessControlModule } from './access-control/access-control.module';


@Module({
    imports: [UsersModule, RfidModule, SubmissionsModule, AccessControlModule],
})
export class SystemAdminModule { }
