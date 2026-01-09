import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule { }
