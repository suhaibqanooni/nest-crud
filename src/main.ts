import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
   
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('CRUD Test')
    .setDescription('Testing nest.js, Prisma and Postgres skills')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(8000,()=>console.log("App is listening on port 8000"));
}
bootstrap();
