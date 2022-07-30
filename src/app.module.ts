import { Module } from '@nestjs/common';
import { QuoterController } from './quoter/quoter.controller';
import { QuoterModule } from './quoter/quoter.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [QuoterModule, AuthModule, ConfigModule],
  controllers: [QuoterController],
  providers: [],
})
export class AppModule {}
