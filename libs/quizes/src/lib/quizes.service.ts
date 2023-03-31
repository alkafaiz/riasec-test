import { Injectable } from '@nestjs/common';
import { Prisma, Quiz } from '@prisma/client';
import { PrismaService } from '@riasec-test/prisma';

@Injectable()
export class QuizesService {
  constructor(private prisma: PrismaService) {}

  async quiz(
    quizWhereUniqueInput: Prisma.QuizWhereUniqueInput
  ): Promise<Quiz | null> {
    return this.prisma.quiz.findUnique({
      where: quizWhereUniqueInput,
    });
  }

  async createQuiz(data: Prisma.QuizCreateInput): Promise<Quiz> {
    return this.prisma.quiz.create({
      data,
    });
  }
}
