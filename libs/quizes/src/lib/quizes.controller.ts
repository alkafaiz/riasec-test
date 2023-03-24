import { Controller, Get } from '@nestjs/common';
import { QuizesService } from './quizes.service';

@Controller('quizes')
export class QuizesController {
  constructor(private quizesService: QuizesService) {
  }

  @Get()
  getQuizes() {
    return 'Hello World!';
  }

}
