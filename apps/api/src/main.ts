import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnv } from './env';

async function bootstrap() {
  const env = validateEnv();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  await app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API démarrée sur le port ${env.PORT}`);
  });
}

bootstrap();
