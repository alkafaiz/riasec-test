import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements Partial<User> {
  id: number;
  email: string;
  firstName: string;
  lastName: string;

  @Exclude()
  password?: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
