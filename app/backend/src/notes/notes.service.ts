import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDTO } from './DTO/create.dto';
import { DatabaseService } from 'src/database/database.service';
import { Note } from './types/note';
import { UpdateDTO } from './DTO/update.dto';

@Injectable()
export class NotesService {
  constructor(private readonly dbService: DatabaseService) {}

  async save(reqData: CreateDTO, user_id: number): Promise<Note> {
    const dbData = await this.dbService.notes.findFirst({
      where: {
        name: reqData.name,
        user_id,
      },
    });

    if (dbData) {
      throw new ConflictException('Note name already in use');
    }

    const dbResponse = await this.dbService.notes.create({
      data: { ...reqData, user_id },
    });

    return dbResponse;
  }

  async getAll(user_id: number): Promise<Note[]> {
    const dbResponse = await this.dbService.notes.findMany({
      where: { user_id },
    });
    return dbResponse;
  }

  async update(reqData: UpdateDTO): Promise<Note> {
    const data = { ...reqData };
    delete data.id;
    const dbResponse = await this.dbService.notes.update({
      where: {
        id: reqData.id,
      },
      data,
    });
    return dbResponse;
  }

  async delete(id: number): Promise<string> {
    const dbResponse = await this.dbService.notes.delete({
      where: {
        id,
      },
    });

    return dbResponse.name;
  }
}
