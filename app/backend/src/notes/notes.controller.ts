import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateDTO } from './DTO/create.dto';
import { coreResponse } from './types/core.res';
import { NotesService } from './notes.service';
import { Note } from './types/note';
import { UpdateDTO } from './DTO/update.dto';
import { noteResponse } from './types/note.res';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createNote(
    @Body() reqData: CreateDTO,
    @Req() request,
  ): Promise<noteResponse> {
    const userId = request.tokenPayload.id;
    const dbResponse = await this.notesService.save(reqData, userId);
    return {
      statusCode: 200,
      note: dbResponse,
      message: `Note '${dbResponse.name}' saved`,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getAllNotes(@Req() request): Promise<Note[]> {
    const userId = request.tokenPayload.id;
    const dbResponse = await this.notesService.getAll(+userId);
    return dbResponse;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  async updateNote(@Body() reqData: UpdateDTO): Promise<noteResponse> {
    const dbResponse = await this.notesService.update(reqData);
    return {
      statusCode: 200,
      note: dbResponse,
      message: `Note '${dbResponse.name}' updated`,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<coreResponse> {
    const dbResponse = await this.notesService.delete(+id);
    return {
      statusCode: 200,
      message: `Note '${dbResponse}' deleted`,
    };
  }
}
