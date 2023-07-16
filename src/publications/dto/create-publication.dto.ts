import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePublicationDTO{
    @IsNumber()
    userId:number;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    text:string;

    @IsDate()
    @IsNotEmpty()
    dateToPublish:Date;

    @IsBoolean()
    @IsNotEmpty()
    published:boolean;

    @IsString()
    @IsNotEmpty()
    socialMedia:string;
}