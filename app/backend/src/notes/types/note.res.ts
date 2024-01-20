import { Note } from './note';

export type noteResponse = {
  statusCode: number;
  message: string;
  note: Note;
};
