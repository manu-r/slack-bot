import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuoterService } from './quoter.service';

@Controller('quoter')
export class QuoterController {
  constructor(private quoterService: QuoterService) {}

  @Get()
  generateImage(@Query('quote') quote: string, @Res() response: Response) {
    this.quoterService.generateQuote(quote).then((data) => {
      response
        .status(200)
        .send(`<img src="data:image/png;base64,${data.toString('base64')}"/>`);
    });
  }
}
