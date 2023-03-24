import { Test } from '@nestjs/testing';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

describe('QuizesController', () => {
  let controller: QuizesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QuizesService],
      controllers: [QuizesController],
    }).compile();

    controller = module.get(QuizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
