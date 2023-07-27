// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  //file system ,allowing the script to write the Swagger document to a file.
  const fs = require('fs');
   //creates a Nest.js application, tkho appmodule eli howa root module and options
  const app = await NestFactory.create(AppModule,{cors:true});
  //This section creates a Swagger configuration using the DocumentBuilder class. 
  //It sets the title, description, and version for the Swagger documentation.
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();
   //generates the Swagger document
  const document = SwaggerModule.createDocument(app, config);
// sets up the Swagger UI for the application. It makes the generated Swagger documentation accessible at the /api endpoint.
  SwaggerModule.setup('api', app, document);

  //This line writes the generated Swagger document to a file named swagger.json.
  // It uses the fs module to perform file I/O operations.
  // The JSON.stringify() method is used to convert the document object to a JSON-formatted string
  // before writing it to the file.
  fs.writeFileSync('swagger.json', JSON.stringify(document));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();