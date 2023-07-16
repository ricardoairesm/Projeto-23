import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationsRepository } from './repository/publications.repository';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Injectable()
export class PublicationsService {

    async findAllUserPublications(id: number) {
        return await this.publicationsRepository.findAllUserPublications(id);
    }
    constructor(private readonly publicationsRepository: PublicationsRepository) { }

    async addPublication(data: CreatePublicationDTO) {
        const publication = await this.publicationsRepository.findPublicationByTitle(data.title);

        if (publication)
            throw new HttpException('Publication already exists', HttpStatus.CONFLICT);
        return await this.publicationsRepository.addPublication({ ...data });
    }
}
