import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('CoreLab - To-do API ')
    .setDescription("A NestJS api for handling To-do notes' info")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  //

  await app.listen(5001);
  console.log(`[🤖]: Application is running on: ${await app.getUrl()}`);
}
bootstrap();
