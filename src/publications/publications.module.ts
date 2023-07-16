import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './repository/publications.repository';
import { PrismaPublicationsRepository } from './repository/implementations/prismaPublications.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PrismaUsersRepository } from 'src/users/repository/implementations/prismaUsers.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PrismaPublicationsRepository,
    },
    UsersService,AuthService,
    {
      provide:UsersRepository,
      useClass:PrismaUsersRepository
    },
  ],

  exports: [
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PrismaPublicationsRepository,
    },
  ],
})
export class PublicationsModule {}