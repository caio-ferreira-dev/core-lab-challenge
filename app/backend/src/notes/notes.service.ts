import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDTO } from './DTO/create.dto';
import { DatabaseService } from 'src/database/database.service';
import { Note } from './types/note';
import { UpdateDTO } from './DTO/update.dto';

@Injectable()
export class NotesService {
  constructor(private readonly dbService: DatabaseService) {}

  async save(reqData: CreateDTO): Promise<string> {
    const dbData = await this.dbService.notes.findFirst({
      where: {
        name: reqData.name,
      },
    });

    if (dbData) {
      throw new ConflictException('Note name already in use');
    }

    const dbResponse = await this.dbService.notes.create({ data: reqData });

    return dbResponse.name;
  }

  async getAll(): Promise<Note[]> {
    const dbResponse = await this.dbService.notes.findMany();
    return dbResponse;
  }

  async getFavorites(): Promise<Note[]> {
    const dbResponse = await this.dbService.notes.findMany({
      where: {
        favorite: true,
      },
    });
    return dbResponse;
  }

  async search(query: string): Promise<Note[]> {
    const dbResponse = await this.dbService.notes.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });
    return dbResponse;
  }

  async update(reqData: UpdateDTO): Promise<string> {
    const data = { ...reqData };
    delete data.id;
    const dbResponse = await this.dbService.notes.update({
      where: {
        id: reqData.id,
      },
      data,
    });
    return dbResponse.name;
  }

  async delete(id: number): Promise<string> {
    console.log(id);

    const dbResponse = await this.dbService.notes.delete({
      where: {
        id,
      },
    });

    return dbResponse.name;
  }
}
