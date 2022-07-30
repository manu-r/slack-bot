import { NestFactory } from '@nestjs/core';
import {
  App,
  ExpressReceiver,
  FileInstallationStore,
  LogLevel,
} from '@slack/bolt';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const receiver = new ExpressReceiver({
    signingSecret: configService.slack.signingSecret,
    clientId: configService.slack.clientId,
    clientSecret: configService.slack.clientSecret,
    stateSecret: 'my-state-secret',
    scopes: ['channels:history', 'chat:write', 'commands'],
    installationStore: new FileInstallationStore(),
  });

  const boltApp = new App({
    receiver: receiver,
  });

  boltApp.event('message', async (everything) => {
    try {
      console.log(JSON.stringify(everything));
    } catch (error) {
      console.error(error);
    }
  });

  app.use('/slack/events', receiver.router);

  await app.listen(3000);
}
bootstrap();
