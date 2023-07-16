import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePublicationWithOutUserIdDTO{

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    text:string;

    @IsString()
    @IsNotEmpty()
    dateToPublish:string;

    @IsBoolean()
    @IsNotEmpty()
    published:boolean;

    @IsString()
    @IsNotEmpty()
    socialMedia:string;
}