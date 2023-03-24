import { Module } from '@nestjs/common';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

@Module({
  controllers: [QuizesController],
  providers: [QuizesService],
  exports: [QuizesService],
})
export class QuizesModule {}
