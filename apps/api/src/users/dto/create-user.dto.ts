import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Omit<User, 'id' | 'refreshToken'> {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  lastName: string;
}
