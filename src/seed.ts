import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeederModule } from './app/seeder/seeder.module';
import { SeederService } from './app/seeder/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(SeederService);

      seeder
        .seed()
        .then(() => {
          logger.log('Seeding complete!', 'Seeder');
        })
        .catch(error => {
          logger.error('Seeding failed!', null, 'Seeder');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
