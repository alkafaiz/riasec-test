import { Module } from '@nestjs/common';
import { PrismaService } from '@riasec-test/prisma';
import { QuizesController, QuizesModule, QuizesService } from '@riasec-test/quizes';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, UsersModule, QuizesModule],
  controllers: [AppController, QuizesController],
  providers: [AppService, QuizesService, PrismaService],
})
export class AppModule {}
