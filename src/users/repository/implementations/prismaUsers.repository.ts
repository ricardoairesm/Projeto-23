import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaService) { };

    async addUser(data: CreateUserDTO) {
        return await this.prisma.users.create({ data: data });
    }

    async findAllUsers(){
        return await this.prisma.users.findMany({});
    }

    async findUserByEmail(email: string) {
        return await this.prisma.users.findFirst({
            where: { email }
        })
    }

    async findUserById(id:number){
        return await this.prisma.users.findFirst({
            where:{id}
        })
    }
}