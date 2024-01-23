import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { NotesModule } from './notes/notes.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, NotesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
