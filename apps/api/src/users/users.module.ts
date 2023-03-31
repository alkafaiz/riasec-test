import { Module } from '@nestjs/common';
import { PrismaService } from '@riasec-test/prisma';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
