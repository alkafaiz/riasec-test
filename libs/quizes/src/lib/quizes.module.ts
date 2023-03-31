import { Module } from '@nestjs/common';
import { PrismaService } from '@riasec-test/prisma';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

@Module({
  controllers: [QuizesController],
  providers: [QuizesService, PrismaService],
  exports: [QuizesService],
})
export class QuizesModule {}
