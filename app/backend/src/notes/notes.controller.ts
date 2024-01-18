import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDTO } from './DTO/create.dto';
import { coreResponse } from './types/core.res';
import { NotesService } from './notes.service';
import { Note } from './types/note';
import { UpdateDTO } from './DTO/update.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() reqData: CreateDTO): Promise<coreResponse> {
    const dbResponse = await this.notesService.save(reqData);
    return {
      statusCode: 200,
      message: `Note '${dbResponse}' saved`,
    };
  }

  @Get()
  async getAllNotes(): Promise<Note[]> {
    const dbResponse = await this.notesService.getAll();
    return dbResponse;
  }

  @Get('/favorite')
  async getFavoritesNotes(): Promise<Note[]> {
    const dbResponse = await this.notesService.getFavorites();
    return dbResponse;
  }

  @Get(':query')
  async searchNotes(@Param('query') queryInput: string): Promise<Note[]> {
    const dbResponse = await this.notesService.search(queryInput);
    return dbResponse;
  }

  @Patch()
  async updateNote(@Body() reqData: UpdateDTO): Promise<coreResponse> {
    const dbResponse = await this.notesService.update(reqData);
    return {
      statusCode: 200,
      message: `Note '${dbResponse}' updated`,
    };
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<coreResponse> {
    const dbResponse = await this.notesService.delete(+id);
    return {
      statusCode: 200,
      message: `Note '${dbResponse}' deleted`,
    };
  }
}
