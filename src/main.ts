import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // This is usefull to enable graphql playground without any CSP problems
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`, 'cdn.jsdelivr.net', 'fonts.googleapis.com'],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
        },
      },
  }));
  // TODO: Add CORS configuration
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`Server start on https://localhost:${port}`, 'BOOTSTRAP');
}
bootstrap();
