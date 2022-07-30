import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class DynamodbService {
  private dbClient: DynamoDBClient;

  constructor(private configService: ConfigService) {
    this.dbClient = new DynamoDBClient({
      region: this.configService.aws.region,
      credentials: {
        accessKeyId: this.configService.aws.accessId,
        secretAccessKey: this.configService.aws.accessKey,
      },
    });
  }
}
