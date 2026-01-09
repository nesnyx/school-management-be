
import { PresenceLessonModule } from './presence-lesson/presence-lesson.module';
import { ELearningModule } from './e-learning/e-learning.module';
import { AdministrationLessonModule } from './administration-lesson/administration-lesson.module';
import { ERaportModule } from './e-raport/e-raport.module';
import { AchievementModule } from './achievement/achievement.module';
import { PunishmentModule } from './punishment/punishment.module';
import { StudentsModule } from './students/students.module';
import { Module } from '@nestjs/common';


@Module({
    imports: [StudentsModule, PresenceLessonModule, ELearningModule, AdministrationLessonModule, ERaportModule, AchievementModule, PunishmentModule],
    exports: [StudentsModule, PresenceLessonModule, ELearningModule, AdministrationLessonModule, ERaportModule, AchievementModule, PunishmentModule]
})
export class AcademicModule { }
