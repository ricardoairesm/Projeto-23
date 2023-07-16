import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthSignInDTO } from './dto/auth-signin.dto';
  import { AuthSignUpDTO } from './dto/auth-signup.dto';
  import { UsersService } from 'src/users/users.service';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { UsersRepository } from 'src/users/repository/users.repository';
  import { Users } from '@prisma/client';
  
  @Injectable()
  export class AuthService {
    private AUDIENCE = 'users';
    private ISSUER = 'Driven';
  
    constructor(
      private readonly usersService: UsersService,
      private readonly usersRepository: UsersRepository,
      private readonly jwtService: JwtService,
    ) {}
  
    async signup(body: AuthSignUpDTO) {
      const user = await this.usersService.addUser(body);
      return this.createToken(user);
    }
  
    async signin({ email, password }: AuthSignInDTO) {
      const user = await this.usersRepository.findUserByEmail(email);
      if (!user) throw new UnauthorizedException('Email or password invalid');
  
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword)
        throw new UnauthorizedException('Email or password invalid');
  
      return this.createToken(user);
    }
  
    createToken(user: Users) {
      const token = this.jwtService.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.ISSUER,
          audience: this.AUDIENCE,
        },
      );
  
      return { token };
    }
  
    checkToken(token: string) {
      try {
        const data = this.jwtService.verify(token, {
          issuer: this.ISSUER,
          audience: this.AUDIENCE,
        });
  
        return data;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }
    }
  }