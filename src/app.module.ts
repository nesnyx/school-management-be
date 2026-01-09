import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AcademicModule } from './modules/academic/academic.module';
import { AuthModule } from './core/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), AcademicModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
