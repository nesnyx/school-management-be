import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AcademicModule } from './modules/academic/academic.module';
import { AuthModule } from './core/auth/auth.module';
import { SystemAdminModule } from './modules/system-admin/system-admin.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { FinanceModule } from './modules/finance/finance.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HealthModule } from './modules/health/health.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), AcademicModule, AuthModule, SystemAdminModule, EmployeeModule, FinanceModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Menerapkan middleware ke semua route ('*')
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
