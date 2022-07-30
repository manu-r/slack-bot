import { Module } from '@nestjs/common';
import { QuoterService } from './quoter.service';

@Module({
  providers: [QuoterService],
  exports: [QuoterService],
})
export class QuoterModule {}
