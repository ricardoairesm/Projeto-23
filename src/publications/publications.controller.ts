import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { UserRequest } from 'src/auth/decorators/user.decorator';
import { Users } from '@prisma/client';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { CreatePublicationWithOutUserIdDTO } from './dto/create-publicationWithoutUserId.dto';

@Controller()
export class PublicationsController {
    constructor(private readonly publicationsService: PublicationsService) { }

    @UseGuards(AuthGuard)
    @Get('publications')
    findUserPublications(@UserRequest() user: Users) {
        const id = Number(user.id);
        return this.publicationsService.findAllUserPublications(id);
    }

    @UseGuards(AuthGuard)
    @Post('publication')
    addPublication(@UserRequest() user: Users, @Body() data: CreatePublicationWithOutUserIdDTO) {
        const id = Number(user.id);
        const date = new Date(data.dateToPublish);
        return this.publicationsService.addPublication({ ...data, userId: id,dateToPublish:date});
    }
}
