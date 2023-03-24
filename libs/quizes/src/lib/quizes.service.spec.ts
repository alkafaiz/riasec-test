import { Test } from '@nestjs/testing';
import { QuizesService } from './quizes.service';

describe('QuizesService', () => {
  let service: QuizesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QuizesService],
    }).compile();

    service = module.get(QuizesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
