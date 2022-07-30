import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as textToImage from 'text-to-image';

@Injectable()
export class QuoterService {
  async generateQuote(quote: string) {
    const quoteImage = (
      await textToImage.generate(quote, {
        maxWidth: 480,
        bgColor: 'black',
        textColor: 'white',
        customHeight: 640,
        textAlign: 'center',
        verticalAlign: 'center',
        fontSize: 24,
      })
    ).replace(/^data:image\/[a-z]+;base64,/, '');

    return sharp('dist/assets/images/template-1.jpg')
      .blur(5)
      .composite([
        {
          input: Buffer.from(quoteImage, 'base64'),
          blend: 'screen',
          gravity: 'northwest',
        },
        {
          input: await sharp('dist/assets/images/logo.png')
            .resize(100, 50)
            .toBuffer(),
          top: 20,
          left: 20,
        },
      ])
      .resize(480, 640)
      .toBuffer();
  }
}
