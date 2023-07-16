import { Publication } from '@prisma/client';
import { CreatePublicationDTO } from '../dto/create-publication.dto';

export abstract class PublicationsRepository {
    abstract addPublication(data: CreatePublicationDTO): Promise<Publication>;
    abstract findAllUserPublications(id:number): Promise<Publication[]>;
    abstract findPublicationByTitle(title: string): Promise<Publication>;
}