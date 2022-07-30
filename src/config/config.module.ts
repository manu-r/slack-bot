import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { existsSync } from 'fs';
import * as Joi from 'joi';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: (() => {
        const configPath = `${
          process.env.NODE_ENV === 'prod' ? '.env' : 'dev.env'
        }`;
        if (!existsSync(configPath)) {
          console.error(`${configPath} file not found`);
          return null;
        }

        return configPath;
      })(),

      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
