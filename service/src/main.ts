import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() 
{
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: 'http://localhost:5173',
      methods: "GET",
      credentials: true
    }
  );
  const config = new DocumentBuilder()
    .setTitle("Service leads")
    .setDescription("Server:NestJS and AmoCRM for get leads")
    .setVersion("1.0.0")
    .addTag("NEST")
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/docs",app,document);

  await app.listen(PORT,() => console.log(`Server has been started on the PORT=${PORT} with protocol=HTTP http://localhost:${PORT}`));
}
bootstrap();
