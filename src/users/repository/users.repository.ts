import { Users } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';

export abstract class UsersRepository {
  abstract addUser(data: CreateUserDTO): Promise<Users>;
  abstract findAllUsers(): Promise<Users[]>;
  abstract findUserByEmail(email: string): Promise<Users>;
  abstract findUserById(id: number): Promise<Users>;
}