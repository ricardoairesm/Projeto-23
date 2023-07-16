import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
  } from 'class-validator';
  
  export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'VC NÃO SABE O QUE É UM EMAIL?' })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
      minLength: 6,
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    avatar:string;
  }