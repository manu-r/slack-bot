import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  public get common() {
    return {
      env: this.nestConfigService.get<string>('NODE_ENV'),
      isDev: this.nestConfigService.get<string>('NODE_ENV') === 'dev',
      isProd: this.nestConfigService.get<string>('NODE_ENV') === 'prod',
    };
  }

  public get aws() {
    return {
      accessId: this.nestConfigService.get<string>('AWS_ACCESS_ID'),
      accessKey: this.nestConfigService.get<string>('AWS_ACCESS_KEY'),
      region: this.nestConfigService.get<string>('AWS_REGION'),
    };
  }

  public get slack() {
    return {
      clientId: this.nestConfigService.get<string>('SLACK_CLIENT_ID'),
      clientSecret: this.nestConfigService.get<string>('SLACK_CLIENT_SECRET'),
      signingSecret: this.nestConfigService.get<string>('SLACK_SIGNING_SECRET'),
    };
  }
}
