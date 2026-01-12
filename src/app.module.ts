import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AcademicModule } from './modules/academic/academic.module';
import { AuthModule } from './core/auth/auth.module';
import { SystemAdminModule } from './modules/system-admin/system-admin.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { FinanceModule } from './modules/finance/finance.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), AcademicModule, AuthModule, SystemAdminModule, EmployeeModule, FinanceModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
