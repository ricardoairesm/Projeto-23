import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDTO } from 'src/publications/dto/create-publication.dto';
import { PublicationsRepository } from '../publications.repository';

@Injectable()
export class PrismaPublicationsRepository implements PublicationsRepository {
    constructor(private readonly prisma: PrismaService) { };

    async addPublication(data: CreatePublicationDTO) {
        return await this.prisma.publication.create({ data: data });
    }

    async findAllUserPublications(id: number) {
        return await this.prisma.publication.findMany({
            where: { userId: id }
        });
    }

    async findPublicationByTitle(title: string) {
        return await this.prisma.publication.findFirst({
            where: { title }
        })
    }

}