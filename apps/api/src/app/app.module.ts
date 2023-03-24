import { Module } from '@nestjs/common';
import { QuizesController, QuizesService } from '@riasec-test/quizes';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, QuizesController],
  providers: [AppService, QuizesService],
})
export class AppModule {}
