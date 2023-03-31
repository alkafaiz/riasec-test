import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QuizesService } from './quizes.service';

@Controller('quizes')
export class QuizesController {
  constructor(private quizesService: QuizesService) {}

  @Post()
  createQuiz() {
    return this.quizesService.createQuiz({
      uuid: 'string',
      author: {
        connect: {
          id: 1,
        },
      },
    });
  }
}
