import { Controller, Post, Body } from '@nestjs/common';
import { PresenceTeacherService } from './presence-teacher.service';
import { CreatePresenceTeacherDto } from './dto/create-presence-teacher.dto';


@Controller('presence-teacher')
export class PresenceTeacherController {
  constructor(private readonly presenceTeacherService: PresenceTeacherService) { }

  @Post("record")
  create(@Body() createPresenceTeacherDto: CreatePresenceTeacherDto) {
    return this.presenceTeacherService.recordPresence(createPresenceTeacherDto);
  }


}
