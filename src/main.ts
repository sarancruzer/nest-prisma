import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );
  const config = new ConfigService();

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // To enable cors origin
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  bootstrapSwagger(app, config);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3001;
  console.log("🚀 ~ file: main.ts:33 ~ bootstrap ~ port:", port)
  Logger.log(`SERVER is running on: ${port}`);

  await app.listen(port, '0.0.0.0');
  // await app.listen(port, '0.0.0.0');

  
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Application is running in : ${await config.get('ENVIRONMENT')} mode`);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Application is running in : ${await config.get('ENVIRONMENT')} mode`);

  
}
bootstrap();

const bootstrapSwagger = (app: NestExpressApplication, config: any) => {
  if (config.get('ENVIRONMENT') === 'development') {
    const configs = new DocumentBuilder()
      .setTitle('UC Api')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();
    const document = SwaggerModule.createDocument(app, configs);
    SwaggerModule.setup('api', app, document);
  }
};
